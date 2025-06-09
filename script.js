document.addEventListener('DOMContentLoaded', () => {
    // --- MODEL: STATE MANAGEMENT ---
    const state = {
        character: {
            name: 'Unnamed Character',
            stats: { str: 10, int: 10, ath: 10 },
            totalXp: 5,
            levelUpPath: [],
            hpRolls: [],
            currentHp: 0,
            abilitiesUsed: {}, // Unified tracker for all abilities
        },
        derived: {
            modifiers: { str: 0, int: 0, ath: 0 },
            spentXp: 0,
            classes: [], 
            abilities: {},
            hp: { total: 0, formula: '(None)' },
            armor: 0,
            equipment: [],
        },
        ui: {
            rolledStats: [],
            assignedStats: { str: false, int: false, ath: false }
        }
    };

    // --- DOM ELEMENT REFERENCES ---
    const dom = {
        charNameInput: document.getElementById('char-name'),
        classSelect: document.getElementById('class-select'),
        multiclassSection: document.getElementById('multiclass-section'),
        multiclassSelect: document.getElementById('multiclass-select'),
        multiclassPrereqDisplay: document.getElementById('multiclass-prereq-display'),
        multiclassBtn: document.getElementById('multiclass-btn'),
        totalXpInput: document.getElementById('total-xp'),
        sheetTotalXpInput: document.getElementById('sheet-total-xp'),
        spentXpSpan: document.getElementById('spent-xp'),
        availableXpSpan: document.getElementById('available-xp'),
        rollStatsBtn: document.getElementById('roll-stats-btn'),
        statAssignmentContainer: document.getElementById('stat-assignment-container'),
        statInputs: { str: document.getElementById('stat-str'), int: document.getElementById('stat-int'), ath: document.getElementById('stat-ath') },
        modifierSpans: { str: document.getElementById('mod-str'), int: document.getElementById('mod-int'), ath: document.getElementById('mod-ath') },
        abilitiesContainer: document.getElementById('abilities-container'),
        sharedAbilitiesContainer: document.getElementById('shared-abilities-container'),
        classAbilitiesGrid: document.getElementById('class-abilities-grid'),
        sheet: {
            name: document.getElementById('character-name-sheet'),
            class: document.getElementById('character-class-sheet'),
            spentXp: document.getElementById('sheet-spent-xp'),
            strScore: document.getElementById('sheet-str-score'), strMod: document.getElementById('sheet-str-mod'),
            intScore: document.getElementById('sheet-int-score'), intMod: document.getElementById('sheet-int-mod'),
            athScore: document.getElementById('sheet-ath-score'), athMod: document.getElementById('sheet-ath-mod'),
            currentHpInput: document.getElementById('sheet-current-hp'),
            maxHpSpan: document.getElementById('sheet-max-hp'),
            hpRolls: document.getElementById('sheet-hp-rolls'),
            armor: document.getElementById('sheet-armor'),
            rerollHpBtn: document.getElementById('reroll-hp-btn'),
            abilitiesContent: document.getElementById('sheet-abilities-content'),
            equipmentList: document.getElementById('sheet-equipment-list'),
            levelUpList: document.getElementById('sheet-levelup-list'),
        }
    };

    // --- UTILITY FUNCTIONS ---
    const getModifier = (score) => { let mod = -6; for (const b in gameData.statModifierTable) { if (score >= b) mod = gameData.statModifierTable[b]; } return mod; };
    const rollDie = (sides) => Math.floor(Math.random() * sides) + 1;
    const findAbilityData = (abilityName) => {
        if(gameData.sharedAbilities[abilityName]) return gameData.sharedAbilities[abilityName];
        for (const className in gameData.classes) { if(gameData.classes[className].abilities[abilityName]) return gameData.classes[className].abilities[abilityName]; }
        return null;
    }

    // --- CORE LOGIC: STATE CALCULATION ---
    const calculateState = () => {
        const derived = { abilities: {}, classes: [], spentXp: 0, modifiers: {}, equipment: new Set(), armor: 0, hp: {} };
        const tempClassList = [];
        state.character.levelUpPath.forEach(log => {
            if (log.type === 'add_class') { tempClassList.push(log.name); return; }
            derived.spentXp += log.cost;
            if (derived.abilities[log.name]) {
                derived.abilities[log.name].sl++; derived.abilities[log.name].purchases.push(log);
            } else { derived.abilities[log.name] = { sl: 1, purchases: [log] }; }
        });
        const classXP = {}; tempClassList.forEach(c => classXP[c] = 0);
        for(const abilityName in derived.abilities) {
            const totalCost = derived.abilities[abilityName].purchases.reduce((acc, p) => acc + p.cost, 0);
            const abilityClass = derived.abilities[abilityName].purchases[0].className;
            if(abilityClass && classXP.hasOwnProperty(abilityClass)) { classXP[abilityClass] += totalCost; }
        }
        derived.classes = tempClassList.map(name => ({ name, xp: classXP[name] || 0 }));
        state.derived.classes = derived.classes;
        for (const stat of gameData.stats) {
            state.character.stats[stat] = parseInt(dom.statInputs[stat].value, 10);
            derived.modifiers[stat] = getModifier(state.character.stats[stat]);
        }
        let maxHpChanged = false;
        if (derived.classes.length > 0) {
            const primaryClass = gameData.classes[derived.classes[0].name];
            const hitDiceCount = 1 + Math.floor(state.character.totalXp / 3);
            if (state.character.hpRolls.length !== hitDiceCount) {
                state.character.hpRolls = Array.from({ length: hitDiceCount }, () => rollDie(primaryClass.hpDie));
                maxHpChanged = true;
            }
            const hpMod = derived.modifiers[primaryClass.hpStat];
            const newMaxHp = state.character.hpRolls.reduce((a, b) => a + b, 0) + hpMod;
            if (state.derived.hp.total !== newMaxHp) maxHpChanged = true;
            derived.hp.total = newMaxHp;
            derived.hp.formula = `${hitDiceCount}d${primaryClass.hpDie} (${state.character.hpRolls.join('+')}) + ${hpMod} (${primaryClass.hpStat.toUpperCase()})`;
        } else { derived.hp = { total: 0, formula: '(None)' }; maxHpChanged = true; }
        if (maxHpChanged) { state.character.currentHp = derived.hp.total; }
        derived.classes.forEach(c => {
            const classData = gameData.classes[c.name];
            classData.startingEquipment.forEach(eq => {
                derived.equipment.add(eq);
                const armorMatch = eq.match(/Armor (\d+)/i);
                if(armorMatch) derived.armor += parseInt(armorMatch[1], 10);
            });
        });
        if (derived.abilities['Bulwark']) derived.armor += derived.modifiers.str;
        state.derived = { ...state.derived, ...derived };
        state.derived.equipment = Array.from(derived.equipment);
    };

    // --- RENDER FUNCTIONS ---
    const updateUI = () => {
        const { character, derived } = state; const s_dom = dom.sheet;
        dom.charNameInput.value = character.name;
        dom.totalXpInput.value = character.totalXp; dom.sheetTotalXpInput.value = character.totalXp;
        dom.spentXpSpan.textContent = derived.spentXp; s_dom.spentXp.textContent = derived.spentXp;
        dom.availableXpSpan.textContent = character.totalXp - derived.spentXp;
        for (const stat of gameData.stats) {
            dom.statInputs[stat].value = character.stats[stat];
            const mod = derived.modifiers[stat];
            dom.modifierSpans[stat].textContent = `${mod >= 0 ? '+' : ''}${mod}`;
        }
        renderAbilities();
        renderSheetHeader();
        s_dom.name.textContent = character.name || 'Unnamed Character';
        s_dom.strScore.textContent = character.stats.str; s_dom.strMod.textContent = `${derived.modifiers.str >= 0 ? '+' : ''}${derived.modifiers.str}`;
        s_dom.intScore.textContent = character.stats.int; s_dom.intMod.textContent = `${derived.modifiers.int >= 0 ? '+' : ''}${derived.modifiers.int}`;
        s_dom.athScore.textContent = character.stats.ath; s_dom.athMod.textContent = `${derived.modifiers.ath >= 0 ? '+' : ''}${derived.modifiers.ath}`;
        s_dom.currentHpInput.value = character.currentHp;
        s_dom.maxHpSpan.textContent = derived.hp.total;
        s_dom.hpRolls.textContent = derived.hp.formula;
        s_dom.armor.textContent = derived.armor;
        s_dom.equipmentList.innerHTML = derived.equipment.length > 0 ? derived.equipment.map(e => `<li>${e}</li>`).join('') : '<li>Nothing</li>';
        renderSheetAbilities();
        renderLevelUpPath();
        handleMulticlassSelect(); // Update prereq display
    };

    const renderAbilities = () => {
        if (state.derived.classes.length === 0) {
            dom.abilitiesContainer.style.display = 'none';
            return;
        }
        dom.abilitiesContainer.style.display = 'block';
        dom.sharedAbilitiesContainer.innerHTML = '';
        Object.keys(gameData.sharedAbilities).forEach(name => dom.sharedAbilitiesContainer.appendChild(createAbilityCard(name, gameData.sharedAbilities[name])));
        dom.classAbilitiesGrid.innerHTML = '';
        dom.classAbilitiesGrid.className = `multiclass-${state.derived.classes.length}`;
        state.derived.classes.forEach(charClass => {
            const classData = gameData.classes[charClass.name];
            const column = document.createElement('div');
            column.className = 'class-column';
            column.innerHTML = `<h3>${classData.name} Abilities</h3>`;
            Object.keys(classData.abilities).forEach(name => {
                if (!classData.abilities[name].isAutoGranted)
                    column.appendChild(createAbilityCard(name, classData.abilities[name], classData))
            });
            dom.classAbilitiesGrid.appendChild(column);
        });
    };

    const createAbilityCard = (name, data, classData) => {
        const card = document.createElement('div');
        card.className = 'ability-card';
        const purchased = state.derived.abilities[name];
        const currentSL = purchased ? purchased.sl : 0;
        const maxSL = data.max_sl || 1;
        const isMaxed = currentSL >= maxSL;
        let cost = Array.isArray(data.cost) ? data.cost[Math.min(currentSL, data.cost.length - 1)] : (data.cost || 0);
        if(data.isStartingChoice && currentSL === 0) {
            const hasChosenStarting = state.character.levelUpPath.some(log => {
                const logData = findAbilityData(log.name);
                return logData && logData.isStartingChoice && log.className === classData?.name;
            });
            if (!hasChosenStarting) cost = 0;
        }
        if ((data.type === 'order' || data.type === 'school') && currentSL === 0) {
             const existingOfType = Object.keys(state.derived.abilities).filter(abil => findAbilityData(abil)?.type === data.type).length;
             if (existingOfType > 0) cost += 5;
        }
        const availableXp = state.character.totalXp - state.derived.spentXp;
        const canAfford = availableXp >= cost;
        const prereqs = checkPrerequisites(data.prerequisites);
        const canLearn = prereqs.met && canAfford;
        card.innerHTML = `<h4>${name}${currentSL > 0 && data.isStackable ? ` (x${currentSL})` : ''}</h4>
            <p>${data.description}</p>
            <p class="cost-info">${isMaxed ? 'Max Level' : `${cost} XP`}</p>
            ${!prereqs.met ? `<p class="prereq-text">Requires: ${prereqs.unmet.join(', ')}</p>`: ''}`;
        if (data.isStackable) {
            const adjuster = document.createElement('div');
            adjuster.className = 'sl-adjuster';
            const displayLevel = maxSL > 90 ? `Purchased: ${currentSL}` : `Level: ${currentSL} / ${maxSL}`;
            adjuster.innerHTML = `<button class="minus-btn" ${currentSL === 0 ? 'disabled' : ''}>-</button>
                <div class="sl-display">${displayLevel}</div>
                <button class="plus-btn" ${isMaxed || !canLearn ? 'disabled' : ''}>+</button>`;
            adjuster.querySelector('.minus-btn').addEventListener('click', () => handlePurchase(name, data, classData, cost, 'down'));
            adjuster.querySelector('.plus-btn').addEventListener('click', () => handlePurchase(name, data, classData, cost, 'up'));
            card.appendChild(adjuster);
        } else {
            const btn = document.createElement('button');
            btn.textContent = purchased ? 'Learned' : 'Learn';
            btn.disabled = purchased || !canLearn;
            btn.addEventListener('click', () => handlePurchase(name, data, classData, cost, 'up'));
            card.appendChild(btn);
        }
        return card;
    };

    const renderSheetHeader = () => {
        const container = dom.sheet.class;
        container.innerHTML = '';
        if (state.derived.classes.length === 0) {
            container.textContent = 'No Class';
            return;
        }
        state.derived.classes.forEach((c, index) => {
            const entry = document.createElement('span');
            entry.className = 'sheet-class-entry';
            entry.textContent = c.name;

            if (index > 0) { // It's a multiclass, add a remove button
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'X';
                removeBtn.className = 'remove-class-btn';
                removeBtn.dataset.className = c.name;
                removeBtn.addEventListener('click', handleRemoveMulticlass);
                entry.appendChild(removeBtn);
            }
            container.appendChild(entry);
            if (index < state.derived.classes.length - 1) {
                container.appendChild(document.createTextNode(' | '));
            }
        });
    }

    const renderSheetAbilities = () => {
        dom.sheet.abilitiesContent.innerHTML = '';
        const purchasedAbilities = Object.keys(state.derived.abilities);
        if (purchasedAbilities.length === 0) {
            dom.sheet.abilitiesContent.innerHTML = `<ul><li>No abilities purchased.</li></ul>`;
            return;
        }
    
        const trackedAbilities = purchasedAbilities.filter(name => {
            const data = findAbilityData(name);
            return data && (data.uses_formula || data.type === 'spell_slot');
        }).sort();
    
        const untrackedAbilities = purchasedAbilities.filter(name => !trackedAbilities.includes(name));
    
        if (trackedAbilities.length > 0) {
            const group = document.createElement('div');
            group.className = 'tracker-group';
            trackedAbilities.forEach(name => {
                const abilityData = findAbilityData(name);
                const currentSL = state.derived.abilities[name]?.sl || 0;
                let totalUses = 0;
    
                if (abilityData.type === 'spell_slot') {
                    totalUses = (abilityData.slotsPerPurchase || 0) * currentSL + (abilityData.uses || 0);
                } else if (abilityData.uses_formula) {
                    const formula = abilityData.uses_formula;
                    totalUses = (formula.base || 0) + ((formula.per_sl || 0) * currentSL);
                    if (formula.stat) {
                        totalUses += state.derived.modifiers[formula.stat] || 0;
                    }
                }
    
                if (totalUses <= 0) return;
    
                const usedCount = state.character.abilitiesUsed[name] || 0;
                const subGroup = document.createElement('div');
                subGroup.innerHTML = `<strong>${name} (${totalUses - usedCount}/${totalUses})</strong>`;
                const trackers = document.createElement('div');
                trackers.className = 'tracker-container';
                for(let i = 0; i < totalUses; i++) {
                    const tracker = document.createElement('div');
                    tracker.className = `tracker-dot ${i < totalUses - usedCount ? 'available' : ''}`;
                    tracker.dataset.abilityName = name;
                    trackers.appendChild(tracker);
                }
                subGroup.appendChild(trackers);
                group.appendChild(subGroup);
            });
            dom.sheet.abilitiesContent.appendChild(group);
        }
    
        if (untrackedAbilities.length > 0) {
            const list = document.createElement('ul');
            list.innerHTML = untrackedAbilities.map(name => {
                const { sl, purchases } = state.derived.abilities[name];
                const data = findAbilityData(name);
                const slText = sl > 1 && data?.isStackable ? ` (x${sl})` : '';
                const extraText = (purchases[0].extra && purchases[0].extra.chosenSpell) ? ` (${purchases[0].extra.chosenSpell})` : '';
                return `<li>${name}${extraText}${slText}</li>`;
            }).join('');
            dom.sheet.abilitiesContent.appendChild(list);
        }
    };

    const renderLevelUpPath = () => {
        const list = dom.sheet.levelUpList;
        list.innerHTML = '';
        if (state.character.levelUpPath.length === 0) {
            list.innerHTML = '<li>No XP spent.</li>';
            return;
        }
        state.character.levelUpPath.forEach(log => {
            if (log.type === 'add_class' || log.cost === 0) return; // Don't show class adds or free abilities
            const li = document.createElement('li');
            li.innerHTML = `<span>- ${log.name}</span> <span class="log-cost">${log.cost} XP</span>`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X';
            removeBtn.className = 'log-remove-btn';
            removeBtn.addEventListener('click', () => {
                state.character.levelUpPath = state.character.levelUpPath.filter(item => item.id !== log.id);
                fullUpdate();
            });
            li.appendChild(removeBtn);
            list.appendChild(li);
        });
        if(list.children.length === 0) list.innerHTML = '<li>No XP spent.</li>';
    };

    const checkPrerequisites = (prereqs) => {
        if (!prereqs) return { met: true, unmet: [] };
        const unmet = []; let met = true;

        if (prereqs.abilities) {
            for(const abilityName in prereqs.abilities) {
                const requiredSL = prereqs.abilities[abilityName];
                const currentSL = state.derived.abilities[abilityName]?.sl || 0;
                if(currentSL < requiredSL) { met = false; unmet.push(`${requiredSL}x ${abilityName}`); }
            }
        }
        if (prereqs.totalSlots) {
            const { name, count } = prereqs.totalSlots;
            const abilityData = findAbilityData(name);
            const purchasedCount = state.derived.abilities[name]?.sl || 0;
            const totalSlotsOwned = (abilityData?.slotsPerPurchase || 0) * purchasedCount;
            if (totalSlotsOwned < count) {
                met = false;
                unmet.push(`${count}+ total ${name}s`);
            }
        }
        if (prereqs.stats) {
            for (const stat in prereqs.stats) {
                if (state.character.stats[stat] < prereqs.stats[stat]) { met = false; unmet.push(`${stat.toUpperCase()} ${prereqs.stats[stat]}+`); }
            }
        }
        return { met, unmet };
    };
    
    // --- EVENT HANDLERS ---
    const handlePurchase = (name, data, classData, cost, direction) => {
        if (direction === 'down') {
            const lastPurchaseIndex = state.character.levelUpPath.map(p => p.name).lastIndexOf(name);
            if (lastPurchaseIndex > -1) { 
                state.character.levelUpPath.splice(lastPurchaseIndex, 1);
                // Also reset used count if it's a tracked ability
                if (state.character.abilitiesUsed[name]) {
                    delete state.character.abilitiesUsed[name];
                }
             }
        } else {
            const logEntry = { id: Date.now() + Math.random(), type: 'purchase', name, cost, className: classData?.name };
            if (data.requiresSpellChoice) {
                const spellLevel = (state.derived.abilities[name]?.sl || 0) + 1;
                const spellList = gameData.spells[spellLevel];
                if(!spellList) { alert("No spells available at this level!"); return; }
                const choice = prompt(`Choose a level ${spellLevel} spell:\n- ${spellList.join('\n- ')}`);
                if(!choice || !spellList.includes(choice)) { alert("Invalid spell choice."); return; }
                logEntry.extra = { chosenSpell: choice };
            }
            state.character.levelUpPath.push(logEntry);
        }
        fullUpdate();
    };
    
    const handleClassSelect = (isMulticlass = false) => {
        const className = isMulticlass ? dom.multiclassSelect.value : dom.classSelect.value;
        if (!className) return;
        const alreadyHasClass = state.character.levelUpPath.some(p => p.type === 'add_class' && p.name === className);
        if (alreadyHasClass) return;

        if (isMulticlass) {
            state.character.levelUpPath.push({ type: 'add_class', name: className, id: Date.now() });
            dom.multiclassSelect.value = '';
        } else {
            state.character.levelUpPath = [{ type: 'add_class', name: className, id: Date.now() }];
            state.character.abilitiesUsed = {};
            dom.multiclassSection.style.display = 'block';
        }
        
        const classData = gameData.classes[className];
        for (const abilityName in classData.abilities) {
            if (classData.abilities[abilityName].isAutoGranted) {
                if (!state.character.levelUpPath.some(p => p.name === abilityName)) {
                    state.character.levelUpPath.push({ type: 'purchase', name: abilityName, cost: 0, className, id: Date.now() + Math.random() });
                }
            }
        }
        fullUpdate();
    };

    const handleRemoveMulticlass = (e) => {
        const classNameToRemove = e.target.dataset.className;
        if (!classNameToRemove) return;

        state.character.levelUpPath = state.character.levelUpPath.filter(log => {
            if (log.type === 'add_class' && log.name === classNameToRemove) return false;
            if (log.type === 'purchase' && log.className === classNameToRemove) {
                 if (state.character.abilitiesUsed[log.name]) {
                    delete state.character.abilitiesUsed[log.name];
                }
                return false;
            }
            return true;
        });
        fullUpdate();
    };

    const handleMulticlassSelect = () => {
        const className = dom.multiclassSelect.value;
        if (!className) {
            dom.multiclassPrereqDisplay.textContent = '';
            dom.multiclassBtn.disabled = true;
            return;
        }
        const prereqs = checkPrerequisites({ stats: gameData.classes[className].multiclassPrereqs });
        if (prereqs.met) {
            dom.multiclassPrereqDisplay.textContent = '';
            dom.multiclassBtn.disabled = false;
        } else {
            dom.multiclassPrereqDisplay.textContent = 'Requires: ' + prereqs.unmet.join(', ');
            dom.multiclassBtn.disabled = true;
        }
    };

    const handleStatRoll = () => {
        state.ui.rolledStats = [];
        state.ui.assignedStats = { str: false, int: false, ath: false };
        dom.statAssignmentContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const rolls = [rollDie(6), rollDie(6), rollDie(6), rollDie(6)];
            rolls.sort((a,b) => b-a);
            const score = rolls[0] + rolls[1] + rolls[2];
            state.ui.rolledStats.push({ score, id: i, assignedTo: null });
        }
        renderStatRolls();
    };

    const renderStatRolls = () => {
        dom.statAssignmentContainer.innerHTML = '';
        state.ui.rolledStats.forEach(roll => {
            const card = document.createElement('div');
            card.className = `stat-roll-card ${roll.assignedTo ? 'assigned' : ''}`;
            let buttons = '';
            if (!roll.assignedTo) {
                buttons = gameData.stats.map(stat => 
                    `<button data-stat="${stat}" data-roll-id="${roll.id}" ${state.ui.assignedStats[stat] ? 'disabled' : ''}>${stat.toUpperCase()}</button>`
                ).join('');
            } else {
                buttons = `<span>Assigned to ${roll.assignedTo.toUpperCase()}</span>`;
            }
            card.innerHTML = `<div class="score">${roll.score}</div><div class="assign-buttons">${buttons}</div>`;
            dom.statAssignmentContainer.appendChild(card);
        });
        dom.statAssignmentContainer.querySelectorAll('button[data-stat]').forEach(btn => {
            btn.addEventListener('click', handleAssignStat);
        });
    };
    
    const handleAssignStat = (e) => {
        const stat = e.target.dataset.stat;
        const rollId = parseInt(e.target.dataset.rollId, 10);
        const roll = state.ui.rolledStats.find(r => r.id === rollId);
        const previousRoll = state.ui.rolledStats.find(r => r.assignedTo === stat);
        if(previousRoll) { previousRoll.assignedTo = null; }
        roll.assignedTo = stat;
        state.ui.assignedStats[stat] = true;
        dom.statInputs[stat].value = roll.score;
        dom.statInputs[stat].setAttribute('data-base-value', roll.score);
        renderStatRolls();
        fullUpdate();
    };
    
    const handleTrackerClick = (e) => {
        if (!e.target.matches('.tracker-dot')) return;
        const abilityName = e.target.dataset.abilityName;
        const usedCount = state.character.abilitiesUsed[abilityName] || 0;
        const abilityData = findAbilityData(abilityName);
        const purchasedCount = state.derived.abilities[abilityName]?.sl || 0;
        let totalUses = 0;

        if (abilityData.type === 'spell_slot') {
            totalUses = (abilityData.slotsPerPurchase || 0) * purchasedCount + (abilityData.uses || 0);
        } else if (abilityData.uses_formula) {
            const formula = abilityData.uses_formula;
            totalUses = (formula.base || 0) + ((formula.per_sl || 0) * purchasedCount);
            if (formula.stat) {
                totalUses += state.derived.modifiers[formula.stat] || 0;
            }
        }
    
        if (e.target.classList.contains('available')) {
            if (usedCount < totalUses) state.character.abilitiesUsed[abilityName] = usedCount + 1;
        } else {
            if (usedCount > 0) state.character.abilitiesUsed[abilityName] = usedCount - 1;
        }
        fullUpdate();
    };
    
    const fullUpdate = () => {
        calculateState();
        updateUI();
    };

    // --- INITIALIZATION ---
    const init = () => {
        Object.keys(gameData.classes).forEach(className => {
            const opt = document.createElement('option');
            opt.value = className; opt.textContent = className;
            dom.classSelect.appendChild(opt.cloneNode(true));
            dom.multiclassSelect.appendChild(opt);
        });
        dom.charNameInput.addEventListener('input', (e) => { state.character.name = e.target.value; fullUpdate(); });
        dom.classSelect.addEventListener('change', () => handleClassSelect(false));
        dom.multiclassBtn.addEventListener('click', () => handleClassSelect(true));
        const handleXpChange = (e) => { state.character.totalXp = parseInt(e.target.value, 10) || 0; fullUpdate(); };
        dom.totalXpInput.addEventListener('input', handleXpChange);
        dom.sheetTotalXpInput.addEventListener('input', handleXpChange);
        Object.values(dom.statInputs).forEach(input => input.addEventListener('input', fullUpdate));
        dom.rollStatsBtn.addEventListener('click', handleStatRoll);
        dom.sheet.rerollHpBtn.addEventListener('click', () => { state.character.hpRolls = []; fullUpdate(); });
        dom.sheet.abilitiesContent.addEventListener('click', handleTrackerClick);
        dom.sheet.currentHpInput.addEventListener('input', (e) => { state.character.currentHp = parseInt(e.target.value, 10) || 0; });
        fullUpdate();
    };
    init();
});