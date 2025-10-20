const gameData = {
    stats: ['str', 'int', 'ath'],
    statModifierTable: { 1: -5, 2: -4, 4: -3, 6: -2, 8: -1, 10: 0, 12: 1, 14: 2, 16: 3, 18: 4, 20: 5, 22: 6, 24: 7, 26: 8, 28: 9, 30: 10 },
    spells: {
        1: ["Find traps", "Locate non-magical object", "Harm", "Minor Illusion"],
        2: ["Fire ray", "Vicious Mockery", "Cure Light Wounds", "Misty Step", "Rope Trick"],
        3: ["Eldritch Blast", "Truth Reglinsped", "Lightning Bolt", "Invisibility", "Fly", "Tidal Wave", "Hold Person", "Animate Corpse"],
        4: ["Counterspell", "Cure Serious Wounds", "Silence", "Burning Hands", "Heat Metal"],
        5: ["Wall of Fire/Ice/Vine/Force", "Healing Words", "Darkness", "Summon Elementals"]
    },
    sharedAbilities: {
        'Ability Score Increase': { name: 'Ability Score Increase', description: 'Add +1 to any ability score.', cost: [2], max_sl: 99, type: 'shared', isStackable: true }
    },
    classes: {
        'Fighter': {
            name: 'Fighter', recommendedStats: 'Strength', hpDie: 10, hpStat: 'str', multiclassPrereqs: { str: 16 },
            startingEquipment: ['Longsword (1d8 + STR mod)', 'Chain Mail (Armor 2)', 'Shield (Armor 1)'],
            startingAbilityOptions: ['Ferocious Attack', 'Second Wind'],
            abilities: {
                'Ferocious Attack': { name: 'Ferocious Attack', description: 'd20 attack. >18 double dmg, <10 hit ally.', cost: [1], max_sl: 99, isStartingChoice: true, isStackable: true, uses_formula: { base: 2, per_sl: 1 } },
                'Second Wind': { name: 'Second Wind', description: 'Heal SL * d6 HP to yourself as a reaction.', cost: [1], max_sl: 99, isStartingChoice: true, isStackable: true, uses_formula: { base: 1, per_sl: 0 } },
                'Block': { name: 'Block', description: 'Use reaction to gain 1d6+STR to armor and redirect attack.', cost: [3], max_sl: 99, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Dual Sword Fighting': { name: 'Dual Sword Fighting', description: 'Gain 2 shortswords. Make 2 attacks, no shield/STR dmg bonus.', cost: [3], max_sl: 1 },
                'Parry': { name: 'Parry', description: 'While dual-wielding, if an opponent misses, gain +2 on your next attack.', cost: [3], max_sl: 1, prerequisites: { abilities: { 'Dual Sword Fighting': 1 } } },
                'Heroic Deed': { name: 'Heroic Deed', description: 'Describe a heroic action to alter the battlefield. GM determines outcome.', cost: [3], max_sl: 1 },
                'Multiattack': { name: 'Multiattack', description: 'Perform 2/3/4 attack actions. Stacks with Dual Sword Fighting.', cost: [5, 10, 15], max_sl: 3, isStackable: true },
                'Zephyrus\' Echo': { name: 'Zephyrus\' Echo', description: 'Reaction to summon SL echoes with 1 HP. Echo copies your action (1 attack).', cost: [10], max_sl: 99, type: 'capstone', isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Indomitable': { name: 'Indomitable', description: 'Force GM reroll or make SL*2 creatures pass a check. (Max 3)', cost: [10], max_sl: 3, type: 'capstone', isStackable: true, uses_formula: { base: 0, per_sl: 1 } }
            }
        },
        'Archer': {
            name: 'Archer', recommendedStats: 'Athletics', hpDie: 8, hpStat: 'ath', multiclassPrereqs: { ath: 16 },
            startingEquipment: ['Longbow (1d6 + ATH mod)', 'Dagger (1d4 + ATH mod)', 'Leather Armor (Armor 1)'],
            startingAbilityOptions: ['Flexible Shots', 'Second Wind (Archer)'],
            abilities: {
                'Flexible Shots': { name: 'Flexible Shots', description: 'Add effect to arrow: Flaming, Pushing, or Poisonous.', cost: [2], max_sl: 99, isStartingChoice: true, isStackable: true, uses_formula: { base: 3, per_sl: 1 } },
                'Second Wind (Archer)': { name: 'Second Wind (Archer)', description: 'Restore 1d6 HP as a reaction. Can be stacked.', cost: [1], max_sl: 99, isStartingChoice: true, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Dash': { name: 'Dash', description: 'Reaction to avoid ranged attack. Next shot +2 damage.', cost: [2], max_sl: 99, isStackable: true, uses_formula: { base: 2, per_sl: 1 } },
                'Dual Arrows Shooting': { name: 'Dual Arrows Shooting', description: 'Shoot 2/3/4 arrows at once with one shot.', cost: [5, 7, 9], max_sl: 3, isStackable: true },
                'Precision attack': { name: 'Precision attack', description: 'Double damage of all arrows in a round (not flexible shots).', cost: [5], max_sl: 99, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Covering Fire': { name: 'Covering Fire', description: 'Shoot 10x10ft area. DC 12+SL ATH save or take 1d6+ATH dmg.', cost: [5], max_sl: 99, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Lightning Speed': { name: 'Lightning Speed', description: 'For 3+SL turns, get 2*SL+3 ATH bonus, free flexible shot, 3+SL arrows/shot.', cost: [10, 15, 20], max_sl: 3, type: 'capstone', isStackable: true, uses_formula: { base: 1, per_sl: 0 } }
            }
        },
        'Wizard': {
            name: 'Wizard', recommendedStats: 'Intelligence', hpDie: 6, hpStat: 'int', multiclassPrereqs: { int: 16 },
            startingEquipment: ['Staff (2 damage)'],
            startingAbilityOptions: ["Immeral's Chaotic Metamagic", "Opheria's Bardic Magic"],
            abilities: {
                'Magical Abilities': { name: 'Magical Abilities', description: 'Grants access to spell slots.', cost: 0, max_sl: 1, isAutoGranted: true },
                'Lvl 1 Spell Slots': { name: 'Lvl 1 Spell Slots', description: 'Base 7 uses/rest. Auto-granted.', cost: 0, max_sl: 1, type: 'spell_slot', uses: 7, isAutoGranted: true, prerequisites: { abilities: { 'Magical Abilities': 1 } } },
                'Lvl 2 Spell Slots': { name: 'Lvl 2 Spell Slots', description: 'Base 6 uses/rest. Auto-granted.', cost: 0, max_sl: 1, type: 'spell_slot', uses: 6, isAutoGranted: true, prerequisites: { abilities: { 'Lvl 1 Spell Slots': 1 } } },
                'Lvl 3 Spell Slots': { name: 'Lvl 3 Spell Slots', description: 'Purchase for a block of 3 level 3 spell slots.', cost: [3], max_sl: 99, type: 'spell_slot', slotsPerPurchase: 3, isStackable: true, prerequisites: { abilities: { 'Lvl 2 Spell Slots': 1 } } },
                'Lvl 4 Spell Slots': { name: 'Lvl 4 Spell Slots', description: 'Purchase for a block of 2 level 4 spell slots.', cost: [4], max_sl: 99, type: 'spell_slot', slotsPerPurchase: 2, isStackable: true, prerequisites: { totalSlots: { name: 'Lvl 3 Spell Slots', count: 4 } } },
                'Lvl 5 Spell Slots': { name: 'Lvl 5 Spell Slots', description: 'Purchase for a block of 2 level 5 spell slots.', cost: [6], max_sl: 99, type: 'spell_slot', slotsPerPurchase: 2, isStackable: true, prerequisites: { totalSlots: { name: 'Lvl 4 Spell Slots', count: 4 } } },
                'Arcane Capstone Slot': { name: 'Arcane Capstone Slot', description: 'Purchase for 1 capstone spell slot.', cost: [10], max_sl: 99, type: 'spell_slot', slotsPerPurchase: 1, isStackable: true, prerequisites: { totalSlots: { name: 'Lvl 5 Spell Slots', count: 4 } } },
                "Immeral's Chaotic Metamagic": { name: "Immeral's Chaotic Metamagic", description: 'Gain 3 chaos points (+2 per SL).', cost: [3], max_sl: 99, isStartingChoice: true, isStackable: true },
                "Opheria's Bardic Magic": { name: "Opheria's Bardic Magic", description: 'Cast via performance. Restore HP to listeners based on spell damage.', cost: [3, 5, 10, 15, 20], max_sl: 5, isStartingChoice: true, isStackable: true },
            }
        },
        'Priest': {
            name: 'Priest', recommendedStats: 'Intelligence or Strength', hpDie: 8, hpStat: 'int', multiclassPrereqs: { str: 14, int: 14 },
            startingEquipment: ['Mace (1d6 + STR mod)', 'Leather Armor (Armor 1)', 'Shield (Armor 1)'],
            startingAbilityOptions: ['Lay on Hands'],
            abilities: {
                'Lay on Hands': { name: 'Lay on Hands', description: 'Once per combat round, restore 2d4+INT HP to other in melee.', cost: 0, max_sl: 1, isStartingChoice: true, uses_formula: { base: 1, per_sl: 0 } },
                'Mass Heal': { name: 'Mass Heal (Healer Order)', description: 'Once per day, heal 100HP among creatures. Grants Healer access.', cost: 3, max_sl: 1, type: 'order', uses_formula: { base: 1, per_sl: 0 } },
                'Bulwark': { name: 'Bulwark (Templar Order)', description: 'Once per combat, add STR bonus to armor. Grants Templar access.', cost: 3, max_sl: 1, type: 'order', uses_formula: { base: 1, per_sl: 0 } },
                'Quick Heal': { name: 'Quick Heal', description: 'Restore SL*d4+INT HP to an ally as a reaction.', cost: [3], max_sl: 99, prerequisites: { abilities: { 'Mass Heal': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Divine Formation - I': { name: 'Divine Formation - I', description: 'All allies regain 1d6 HP.', cost: [1], max_sl: 99, prerequisites: { abilities: { 'Mass Heal': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Divine Formation - II': { name: 'Divine Formation - II', description: 'Deal 1d6 dmg to melee enemies (2x to undead).', cost: [1], max_sl: 99, prerequisites: { abilities: { 'Holy Smite': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Holy Aura': { name: 'Holy Aura', description: 'Reaction, mark SL enemies. Damaging them causes small explosion. (Max 5)', cost: [2], max_sl: 5, prerequisites: { abilities: { 'Holy Smite': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Divine Formation - III': { name: 'Divine Formation - III', description: 'Allies gain +1 armor for SL rounds.', cost: [1], max_sl: 99, prerequisites: { abilities: { 'Bulwark': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Holy Light': { name: 'Holy Light', description: 'Opponents get -1 armor for 1 round.', cost: [3], max_sl: 99, prerequisites: { abilities: { 'Bulwark': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Holy Smite': { name: 'Holy Smite (Crusader Order)', description: 'Mark target. On death, it explodes for 15 dmg. Grants Crusader access.', cost: 3, max_sl: 1, type: 'order' }
            }
        },
        'Bard': {
            name: 'Bard', recommendedStats: 'Intelligence or Athletics', hpDie: 6, hpStat: 'int', multiclassPrereqs: { ath: 14, int: 14 },
            startingEquipment: ['Instrument (two-handed)', 'Dagger (1d4 + ATH mod)', 'Shortsword (1d6 + STR mod)', 'Leather Armor (Armor 1)'],
            startingAbilityOptions: ['Inspiration', 'Battle Support', 'Deception', 'Pacify'],
            abilities: {
                'Inspiration': { name: 'Inspiration', description: 'Allies get +INT mod on non-combat checks.', cost: [1], max_sl: 99, isStartingChoice: true, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Expertise': { name: 'Expertise', description: 'Add +SL bonus to one type of INT check (Persuasion, etc.).', cost: [1], max_sl: 99, isStackable: true },
                'Embolo\'s Bardic Magic': { name: 'Embolo\'s Bardic Magic', description: 'Learn ONE spell of Lvl 1/2/3/4/5. Must know a lower level spell first.', cost: [1, 2, 3, 5, 7], max_sl: 5, requiresSpellChoice: true, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Battle Support': { name: 'Battle Support (Skald School)', description: 'Give ally +INT/ATH mod on dmg/saves. Grants Skald access.', cost: 0, max_sl: 1, type: 'school', isStartingChoice: true, uses_formula: { base: 1, per_sl: 0 } },
                'Deception': { name: 'Deception (Charlatan School)', description: 'Enemies may mistake you for an ally. Grants Charlatan access.', cost: 0, max_sl: 1, type: 'school', isStartingChoice: true },
                'Pacify': { name: 'Pacify (Troubadour School)', description: 'Before combat, INT roll to avoid fight. Grants Troubadour access.', cost: 0, max_sl: 1, type: 'school', isStartingChoice: true },
                'Loremaster': { name: 'Loremaster', description: 'Explain lore to GM to ask one question.', cost: [3], max_sl: 99, prerequisites: { abilities: { 'Pacify': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Soothing Ballad': { name: 'Soothing Ballad', description: 'Sing to deduct INT mod from enemy dmg, add to ally dmg.', cost: [5], max_sl: 99, prerequisites: { abilities: { 'Pacify': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Skald\'s War Beat': { name: 'Skald\'s War Beat', description: 'Action: allies get +SL weapon dmg bonus for 1 round.', cost: [3], max_sl: 99, prerequisites: { abilities: { 'Battle Support': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 0, stat: 'int' } },
                'Martial Epic': { name: 'Martial Epic', description: 'Reaction: INT check to grant allies bonus d4/d6 dmg.', cost: [5, 5, 10], max_sl: 99, prerequisites: { abilities: { 'Battle Support': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Evasion': { name: 'Evasion', description: 'Reaction to evade an attack.', cost: [2], max_sl: 99, prerequisites: { abilities: { 'Deception': 1 } }, isStackable: true, uses_formula: { base: 0, per_sl: 1 } },
                'Decoy': { name: 'Decoy', description: 'Reaction to conjure 10 HP decoy.', cost: [5], max_sl: 99, prerequisites: { abilities: { 'Deception': 1 } }, isStackable: true, uses_formula: { stat: 'ath', per_sl: 1 } }
            }
        }
    }
};