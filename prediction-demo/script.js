// Sample data embedded in the script
const SAMPLE_FIXTURES = [
  {
    "fixture": {
      "id": "2022-ARS-TOT",
      "timezone": "UTC",
      "date": "2022-10-01T11:30:00Z",
      "venue": { "name": "Emirates Stadium", "city": "London" },
      "status": { "short": "FT", "long": "Match Finished" }
    },
    "league": {
      "id": 39,
      "name": "Premier League",
      "country": "England",
      "season": 2022,
      "round": "Regular Season - 9"
    },
    "teams": {
      "home": { "id": 42, "name": "Arsenal", "logo": "https://media.api-sports.io/football/teams/42.png", "winner": true },
      "away": { "id": 47, "name": "Tottenham", "logo": "https://media.api-sports.io/football/teams/47.png", "winner": false }
    },
    "goals": { "home": 3, "away": 1 },
    "score": {
      "halftime": { "home": 1, "away": 1 },
      "fulltime": { "home": 3, "away": 1 }
    }
  },
  {
    "fixture": {
      "id": "2022-LIV-BHA",
      "timezone": "UTC",
      "date": "2022-10-01T14:00:00Z",
      "venue": { "name": "Anfield", "city": "Liverpool" },
      "status": { "short": "FT", "long": "Match Finished" }
    },
    "league": {
      "id": 39,
      "name": "Premier League",
      "country": "England",
      "season": 2022,
      "round": "Regular Season - 9"
    },
    "teams": {
      "home": { "id": 40, "name": "Liverpool", "logo": "https://media.api-sports.io/football/teams/40.png", "winner": false },
      "away": { "id": 51, "name": "Brighton", "logo": "https://media.api-sports.io/football/teams/51.png", "winner": false }
    },
    "goals": { "home": 3, "away": 3 },
    "score": {
      "halftime": { "home": 1, "away": 2 },
      "fulltime": { "home": 3, "away": 3 }
    }
  },
  {
    "fixture": {
      "id": "2022-MCI-MUN",
      "timezone": "UTC",
      "date": "2022-10-02T13:00:00Z",
      "venue": { "name": "Etihad Stadium", "city": "Manchester" },
      "status": { "short": "FT", "long": "Match Finished" }
    },
    "league": {
      "id": 39,
      "name": "Premier League",
      "country": "England",
      "season": 2022,
      "round": "Regular Season - 9"
    },
    "teams": {
      "home": { "id": 50, "name": "Manchester City", "logo": "https://media.api-sports.io/football/teams/50.png", "winner": true },
      "away": { "id": 33, "name": "Manchester United", "logo": "https://media.api-sports.io/football/teams/33.png", "winner": false }
    },
    "goals": { "home": 6, "away": 3 },
    "score": {
      "halftime": { "home": 4, "away": 0 },
      "fulltime": { "home": 6, "away": 3 }
    }
  },
  {
    "fixture": {
      "id": "2022-CHE-WOL",
      "timezone": "UTC",
      "date": "2022-10-08T14:00:00Z",
      "venue": { "name": "Stamford Bridge", "city": "London" },
      "status": { "short": "FT", "long": "Match Finished" }
    },
    "league": {
      "id": 39,
      "name": "Premier League",
      "country": "England",
      "season": 2022,
      "round": "Regular Season - 10"
    },
    "teams": {
      "home": { "id": 49, "name": "Chelsea", "logo": "https://media.api-sports.io/football/teams/49.png", "winner": true },
      "away": { "id": 39, "name": "Wolves", "logo": "https://media.api-sports.io/football/teams/39.png", "winner": false }
    },
    "goals": { "home": 3, "away": 0 },
    "score": {
      "halftime": { "home": 1, "away": 0 },
      "fulltime": { "home": 3, "away": 0 }
    }
  }
];

const SAMPLE_ODDS = {
  "2022-ARS-TOT": {
    "bookmaker": { "key": "sample", "title": "Sample Odds (Oct 2022)" },
    "odds": { "homeWin": 1.85, "draw": 3.80, "awayWin": 4.20 }
  },
  "2022-LIV-BHA": {
    "bookmaker": { "key": "sample", "title": "Sample Odds (Oct 2022)" },
    "odds": { "homeWin": 1.55, "draw": 4.10, "awayWin": 5.20 }
  },
  "2022-MCI-MUN": {
    "bookmaker": { "key": "sample", "title": "Sample Odds (Oct 2022)" },
    "odds": { "homeWin": 1.45, "draw": 4.50, "awayWin": 6.00 }
  },
  "2022-CHE-WOL": {
    "bookmaker": { "key": "sample", "title": "Sample Odds (Oct 2022)" },
    "odds": { "homeWin": 1.65, "draw": 3.90, "awayWin": 5.10 }
  }
};

const SAMPLE_TEAM_STATS = {
  "42": {
    "season2021": {
      "league": { "rank": 5, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 22 },
        "draws": { "total": 3 },
        "loses": { "total": 13 }
      },
      "goals": {
        "for": { "total": { "total": 61 } },
        "against": { "total": { "total": 48 } }
      },
      "form": "WWLWW"
    },
    "season2022PreMatch": {
      "label": "Before Oct 1, 2022",
      "league": { "rank": 1, "season": 2022 },
      "fixtures": {
        "played": { "total": 7 },
        "wins": { "total": 6 },
        "draws": { "total": 0 },
        "loses": { "total": 1 }
      },
      "goals": {
        "for": { "total": { "total": 17 } },
        "against": { "total": { "total": 7 } }
      },
      "form": "WWWLWW"
    }
  },
  "47": {
    "season2021": {
      "league": { "rank": 4, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 22 },
        "draws": { "total": 5 },
        "loses": { "total": 11 }
      },
      "goals": {
        "for": { "total": { "total": 69 } },
        "against": { "total": { "total": 40 } }
      },
      "form": "WDWWW"
    },
    "season2022PreMatch": {
      "label": "Before Oct 1, 2022",
      "league": { "rank": 3, "season": 2022 },
      "fixtures": {
        "played": { "total": 7 },
        "wins": { "total": 5 },
        "draws": { "total": 2 },
        "loses": { "total": 0 }
      },
      "goals": {
        "for": { "total": { "total": 18 } },
        "against": { "total": { "total": 7 } }
      },
      "form": "WWDWWW"
    }
  },
  "40": {
    "season2021": {
      "league": { "rank": 2, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 28 },
        "draws": { "total": 8 },
        "loses": { "total": 2 }
      },
      "goals": {
        "for": { "total": { "total": 94 } },
        "against": { "total": { "total": 26 } }
      },
      "form": "WDWWW"
    },
    "season2022PreMatch": {
      "label": "Before Oct 1, 2022",
      "league": { "rank": 9, "season": 2022 },
      "fixtures": {
        "played": { "total": 7 },
        "wins": { "total": 2 },
        "draws": { "total": 4 },
        "loses": { "total": 1 }
      },
      "goals": {
        "for": { "total": { "total": 15 } },
        "against": { "total": { "total": 9 } }
      },
      "form": "WDLDDW"
    }
  },
  "51": {
    "season2021": {
      "league": { "rank": 9, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 12 },
        "draws": { "total": 15 },
        "loses": { "total": 11 }
      },
      "goals": {
        "for": { "total": { "total": 42 } },
        "against": { "total": { "total": 44 } }
      },
      "form": "WDDWL"
    },
    "season2022PreMatch": {
      "label": "Before Oct 1, 2022",
      "league": { "rank": 4, "season": 2022 },
      "fixtures": {
        "played": { "total": 6 },
        "wins": { "total": 4 },
        "draws": { "total": 1 },
        "loses": { "total": 1 }
      },
      "goals": {
        "for": { "total": { "total": 11 } },
        "against": { "total": { "total": 5 } }
      },
      "form": "WDWWL"
    }
  },
  "50": {
    "season2021": {
      "league": { "rank": 1, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 29 },
        "draws": { "total": 6 },
        "loses": { "total": 3 }
      },
      "goals": {
        "for": { "total": { "total": 99 } },
        "against": { "total": { "total": 26 } }
      },
      "form": "WWWWW"
    },
    "season2022PreMatch": {
      "label": "Before Oct 2, 2022",
      "league": { "rank": 2, "season": 2022 },
      "fixtures": {
        "played": { "total": 7 },
        "wins": { "total": 5 },
        "draws": { "total": 2 },
        "loses": { "total": 0 }
      },
      "goals": {
        "for": { "total": { "total": 23 } },
        "against": { "total": { "total": 6 } }
      },
      "form": "WDWWWW"
    }
  },
  "33": {
    "season2021": {
      "league": { "rank": 6, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 16 },
        "draws": { "total": 10 },
        "loses": { "total": 12 }
      },
      "goals": {
        "for": { "total": { "total": 57 } },
        "against": { "total": { "total": 57 } }
      },
      "form": "WLWLW"
    },
    "season2022PreMatch": {
      "label": "Before Oct 2, 2022",
      "league": { "rank": 5, "season": 2022 },
      "fixtures": {
        "played": { "total": 6 },
        "wins": { "total": 4 },
        "draws": { "total": 0 },
        "loses": { "total": 2 }
      },
      "goals": {
        "for": { "total": { "total": 8 } },
        "against": { "total": { "total": 8 } }
      },
      "form": "LLWWWW"
    }
  },
  "49": {
    "season2021": {
      "league": { "rank": 3, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 21 },
        "draws": { "total": 11 },
        "loses": { "total": 6 }
      },
      "goals": {
        "for": { "total": { "total": 76 } },
        "against": { "total": { "total": 33 } }
      },
      "form": "WWDWW"
    },
    "season2022PreMatch": {
      "label": "Before Oct 8, 2022",
      "league": { "rank": 7, "season": 2022 },
      "fixtures": {
        "played": { "total": 7 },
        "wins": { "total": 4 },
        "draws": { "total": 1 },
        "loses": { "total": 2 }
      },
      "goals": {
        "for": { "total": { "total": 10 } },
        "against": { "total": { "total": 8 } }
      },
      "form": "WLWDWW"
    }
  },
  "39": {
    "season2021": {
      "league": { "rank": 10, "season": 2021 },
      "fixtures": {
        "played": { "total": 38 },
        "wins": { "total": 15 },
        "draws": { "total": 6 },
        "loses": { "total": 17 }
      },
      "goals": {
        "for": { "total": { "total": 38 } },
        "against": { "total": { "total": 43 } }
      },
      "form": "LLWWL"
    },
    "season2022PreMatch": {
      "label": "Before Oct 8, 2022",
      "league": { "rank": 18, "season": 2022 },
      "fixtures": {
        "played": { "total": 8 },
        "wins": { "total": 1 },
        "draws": { "total": 3 },
        "loses": { "total": 4 }
      },
      "goals": {
        "for": { "total": { "total": 3 } },
        "against": { "total": { "total": 9 } }
      },
      "form": "DDLWLL"
    }
  }
};

// Hardcoded AI predictions for each fixture (simulating AI analysis)
const AI_PREDICTIONS = {
  "2022-ARS-TOT": {
    homeWin: 2.10,
    draw: 3.50,
    awayWin: 3.00,
    confidence: 75,
    model: "qwen-turbo"
  },
  "2022-LIV-BHA": {
    homeWin: 1.62,
    draw: 4.00,
    awayWin: 5.50,
    confidence: 72,
    model: "AI Analysis Engine"
  },
  "2022-MCI-MUN": {
    homeWin: 1.50,
    draw: 4.30,
    awayWin: 6.20,
    confidence: 85,
    model: "AI Analysis Engine"
  },
  "2022-CHE-WOL": {
    homeWin: 1.45,
    draw: 3.80,
    awayWin: 9.00,
    confidence: 75,
    model: "qwen-turbo"
  }
};

// Global state
let selectedFixture = null;
let aiPredictionData = null;
let actualOddsData = null;

// Utility functions
function convertDecimalToAmerican(dec) {
    if (!isFinite(dec) || dec <= 1) return 'N/A';
    if (dec >= 2) return `+${Math.round((dec - 1) * 100)}`;
    return `-${Math.round(100 / (dec - 1))}`;
}

function formatMoneylineWithProbability(dec) {
    if (!isFinite(dec) || dec <= 1) return 'N/A';
    const american = convertDecimalToAmerican(dec);
    const implied = (1 / dec * 100).toFixed(1);
    return `${american} <small>(${dec.toFixed(2)} | ${implied}% )</small>`;
}

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Load fixtures
function loadFixtures() {
    showLoading();
    
    // Simulate loading delay
    setTimeout(() => {
        displayFixtures(SAMPLE_FIXTURES);
        document.getElementById('fixturesSection').style.display = 'block';
        hideLoading();
    }, 500);
}

// Display fixtures
function displayFixtures(fixtures) {
    const container = document.getElementById('fixturesContainer');
    container.innerHTML = '';
    
    fixtures.forEach(fixture => {
        const card = document.createElement('div');
        card.className = 'fixture-card';
        card.innerHTML = `
            <div class="fixture-date">${formatDate(fixture.fixture.date)}</div>
            <div class="fixture-teams">
                ${fixture.teams.home.name} vs ${fixture.teams.away.name}
            </div>
            <div class="fixture-venue">${fixture.fixture.venue.name} <span class="sample-pill">Sample</span></div>
        `;
        
        card.addEventListener('click', () => selectFixture(fixture, card));
        container.appendChild(card);
    });
}

// Select a fixture
function selectFixture(fixture, cardElement) {
    showLoading();
    
    // Update UI
    document.querySelectorAll('.fixture-card').forEach(card => {
        card.classList.remove('selected');
    });
    cardElement.classList.add('selected');
    
    selectedFixture = fixture;
    aiPredictionData = null;
    actualOddsData = null;
    
    // Simulate loading delay
    setTimeout(() => {
        const homeStats = SAMPLE_TEAM_STATS[fixture.teams.home.id];
        const awayStats = SAMPLE_TEAM_STATS[fixture.teams.away.id];
        
        displayMatchInfo(fixture, homeStats, awayStats);
        document.getElementById('predictionSection').style.display = 'block';
        
        // Reset prediction displays
        document.getElementById('aiPrediction').innerHTML = '<button id="generatePredictionBtn" class="btn btn-success">Generate AI Moneyline</button>';
        document.getElementById('actualOdds').innerHTML = '<p class="placeholder">Load moneyline odds from bookmakers</p><button id="loadOddsBtn" class="btn btn-secondary">Load Actual Moneyline Odds</button>';
        document.getElementById('comparisonSection').style.display = 'none';
        
        // Re-attach event listeners
        document.getElementById('generatePredictionBtn').addEventListener('click', generatePrediction);
        document.getElementById('loadOddsBtn').addEventListener('click', loadActualOdds);
        
        // Scroll to prediction section
        document.getElementById('predictionSection').scrollIntoView({ behavior: 'smooth' });
        
        hideLoading();
    }, 500);
}

// Display match information
function displayMatchInfo(fixture, homeStats, awayStats) {
    const container = document.getElementById('matchInfo');
    
    container.innerHTML = `
        <div class="match-header">
            ${fixture.teams.home.name} vs ${fixture.teams.away.name}
        </div>
        <div class="sample-tag">Sample Fixture Data</div>
        <div style="text-align: center; color: #666; margin-bottom: 20px;">
            ${formatDate(fixture.fixture.date)} | ${fixture.fixture.venue.name}
        </div>
        <div class="team-stats">
            <div class="team-stat-box">
                <h4>${fixture.teams.home.name} (Home)</h4>
                ${formatTeamStats(homeStats)}
            </div>
            <div class="team-stat-box">
                <h4>${fixture.teams.away.name} (Away)</h4>
                ${formatTeamStats(awayStats)}
            </div>
        </div>
    `;
}

// Format team statistics
function formatTeamStats(stats) {
    if (!stats) {
        return '<p>Statistics not available</p>';
    }

    const renderBlock = (label, payload) => {
        if (!payload) return '';
        const played = payload.fixtures?.played?.total ?? 'N/A';
        const wins = payload.fixtures?.wins?.total ?? 'N/A';
        const draws = payload.fixtures?.draws?.total ?? 'N/A';
        const loses = payload.fixtures?.loses?.total ?? 'N/A';
        const goalsFor = payload.goals?.for?.total?.total ?? 'N/A';
        const goalsAgainst = payload.goals?.against?.total?.total ?? 'N/A';
        const form = payload.form || 'N/A';
        const rank = payload.league?.rank ? `Rank: #${payload.league.rank}` : '';
        const subLabel = payload.label ? ` • ${payload.label}` : '';

        return `
            <div class="stat-period">
                <div class="stat-period-header">
                    <span>${label}${subLabel}</span>
                    <span>${rank}</span>
                </div>
                <div class="stat-item">
                    <span>Matches Played:</span>
                    <strong>${played}</strong>
                </div>
                <div class="stat-item">
                    <span>Wins:</span>
                    <strong>${wins}</strong>
                </div>
                <div class="stat-item">
                    <span>Draws:</span>
                    <strong>${draws}</strong>
                </div>
                <div class="stat-item">
                    <span>Losses:</span>
                    <strong>${loses}</strong>
                </div>
                <div class="stat-item">
                    <span>Goals For / Against:</span>
                    <strong>${goalsFor} / ${goalsAgainst}</strong>
                </div>
                <div class="stat-item">
                    <span>Form:</span>
                    <strong>${form}</strong>
                </div>
            </div>
        `;
    };

    const sections = [
        renderBlock('2021 Season', stats.season2021),
        renderBlock('2022 Pre-Match', stats.season2022PreMatch)
    ].filter(Boolean);

    return sections.length
        ? `<div class="stat-periods">${sections.join('')}</div>`
        : '<p>Statistics not available</p>';
}

// Generate AI prediction
function generatePrediction() {
    if (!selectedFixture) {
        alert('Please select a fixture first');
        return;
    }
    
    showLoading();
    
    // Simulate AI processing time
    setTimeout(() => {
        const prediction = AI_PREDICTIONS[selectedFixture.fixture.id];
        aiPredictionData = {
            ...prediction,
            timestamp: new Date().toISOString()
        };
        
        displayAIPrediction(aiPredictionData);
        
        // Check if we can compare
        if (actualOddsData) {
            compareOdds();
        }
        
        hideLoading();
    }, 1500);
}

// Load actual odds
function loadActualOdds() {
    if (!selectedFixture) {
        alert('Please select a fixture first');
        return;
    }
    
    showLoading();
    
    // Simulate loading delay
    setTimeout(() => {
        const oddsData = SAMPLE_ODDS[selectedFixture.fixture.id];
        
        if (oddsData && oddsData.odds) {
            const odds = oddsData.odds;
            actualOddsData = {
                homeWinDecimal: odds.homeWin,
                drawDecimal: odds.draw,
                awayWinDecimal: odds.awayWin,
                homeWinAmerican: convertDecimalToAmerican(odds.homeWin),
                drawAmerican: convertDecimalToAmerican(odds.draw),
                awayWinAmerican: convertDecimalToAmerican(odds.awayWin),
                bookmakerName: oddsData.bookmaker.title
            };
            
            displayActualOdds(actualOddsData);
            
            if (aiPredictionData) {
                compareOdds();
            }
        }
        
        hideLoading();
    }, 800);
}

// Display actual odds
function displayActualOdds(odds) {
    const container = document.getElementById('actualOdds');
    
    container.innerHTML = `
        <div class="odds-display">
            <div class="odds-item">
                <span class="odds-label">Home Moneyline:</span>
                <span class="odds-value">${formatMoneylineWithProbability(odds.homeWinDecimal)}</span>
            </div>
            <div class="odds-item">
                <span class="odds-label">Draw:</span>
                <span class="odds-value">${formatMoneylineWithProbability(odds.drawDecimal)}</span>
            </div>
            <div class="odds-item">
                <span class="odds-label">Away Moneyline:</span>
                <span class="odds-value">${formatMoneylineWithProbability(odds.awayWinDecimal)}</span>
            </div>
        </div>
        <p style="text-align: center; margin-top: 15px; color: #666; font-size: 0.9em;">
            Moneyline odds from ${odds.bookmakerName || 'bookmaker'}
        </p>
    `;
}

// Display AI prediction
function displayAIPrediction(prediction) {
    const container = document.getElementById('aiPrediction');
    
    container.innerHTML = `
        <div class="odds-display">
            <div class="odds-item">
                <span class="odds-label">Home Moneyline:</span>
                <span class="odds-value">${formatMoneylineWithProbability(prediction.homeWin)}</span>
            </div>
            <div class="odds-item">
                <span class="odds-label">Draw:</span>
                <span class="odds-value">${formatMoneylineWithProbability(prediction.draw)}</span>
            </div>
            <div class="odds-item">
                <span class="odds-label">Away Moneyline:</span>
                <span class="odds-value">${formatMoneylineWithProbability(prediction.awayWin)}</span>
            </div>
        </div>
        <div class="confidence-meter">
            <strong>Confidence Level:</strong>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${prediction.confidence}%">
                    ${prediction.confidence}%
                </div>
            </div>
        </div>
        <p style="text-align: center; margin-top: 10px; color: #666; font-size: 0.9em;">
            Generated by ${prediction.model} at ${new Date(prediction.timestamp).toLocaleTimeString()}
        </p>
    `;
}

// Compare odds
function compareOdds() {
    if (!aiPredictionData || !actualOddsData) {
        return;
    }
    
    showLoading();
    
    // Simulate processing delay
    setTimeout(() => {
        // Calculate differences
        const homeWinDiff = Math.abs(aiPredictionData.homeWin - actualOddsData.homeWinDecimal);
        const drawDiff = Math.abs(aiPredictionData.draw - actualOddsData.drawDecimal);
        const awayWinDiff = Math.abs(aiPredictionData.awayWin - actualOddsData.awayWinDecimal);
        
        const homeWinPercent = (homeWinDiff / actualOddsData.homeWinDecimal) * 100;
        const drawPercent = (drawDiff / actualOddsData.drawDecimal) * 100;
        const awayWinPercent = (awayWinDiff / actualOddsData.awayWinDecimal) * 100;
        
        const averageDiff = ((homeWinPercent + drawPercent + awayWinPercent) / 3).toFixed(2);
        const accuracy = Math.max(0, 100 - averageDiff).toFixed(2);
        
        // Determine closest prediction
        const diffs = [
            { name: 'home win', value: homeWinPercent },
            { name: 'draw', value: drawPercent },
            { name: 'away win', value: awayWinPercent }
        ];
        const closest = diffs.reduce((min, curr) => curr.value < min.value ? curr : min);
        
        const comparisonData = {
            accuracy: accuracy,
            comparison: {
                homeWin: {
                    llm: aiPredictionData.homeWin,
                    actual: actualOddsData.homeWinDecimal,
                    difference: homeWinDiff,
                    percentageDiff: homeWinPercent
                },
                draw: {
                    llm: aiPredictionData.draw,
                    actual: actualOddsData.drawDecimal,
                    difference: drawDiff,
                    percentageDiff: drawPercent
                },
                awayWin: {
                    llm: aiPredictionData.awayWin,
                    actual: actualOddsData.awayWinDecimal,
                    difference: awayWinDiff,
                    percentageDiff: awayWinPercent
                }
            },
            summary: {
                closestPrediction: closest.name,
                averageDifference: averageDiff
            }
        };
        
        displayComparison(comparisonData);
        document.getElementById('comparisonSection').style.display = 'block';
        document.getElementById('comparisonSection').scrollIntoView({ behavior: 'smooth' });
        
        hideLoading();
    }, 500);
}

// Display comparison results
function displayComparison(data) {
    const container = document.getElementById('comparisonResults');
    
    container.innerHTML = `
        <div class="accuracy-score">${data.accuracy}%</div>
        <p style="text-align: center; font-size: 1.2em; margin-bottom: 20px;">Overall Accuracy</p>
        
        <div class="comparison-grid">
            <div class="comparison-item">
                <div class="comparison-header">Home Win</div>
                <div class="comparison-values">
                    <div class="value-box">
                        <span class="value-label">AI Prediction</span>
                        <div class="value-number">${data.comparison.homeWin.llm.toFixed(2)}</div>
                    </div>
                    <div class="value-box">
                        <span class="value-label">Actual Odds</span>
                        <div class="value-number">${data.comparison.homeWin.actual.toFixed(2)}</div>
                    </div>
                    <div class="value-box">
                        <span class="value-label">Difference</span>
                        <div class="value-number">${data.comparison.homeWin.difference.toFixed(2)}</div>
                    </div>
                </div>
                <div class="difference">
                    ${data.comparison.homeWin.percentageDiff.toFixed(2)}% difference
                </div>
            </div>
            
            <div class="comparison-item">
                <div class="comparison-header">Draw</div>
                <div class="comparison-values">
                    <div class="value-box">
                        <span class="value-label">AI Prediction</span>
                        <div class="value-number">${data.comparison.draw.llm.toFixed(2)}</div>
                    </div>
                    <div class="value-box">
                        <span class="value-label">Actual Odds</span>
                        <div class="value-number">${data.comparison.draw.actual.toFixed(2)}</div>
                    </div>
                    <div class="value-box">
                        <span class="value-label">Difference</span>
                        <div class="value-number">${data.comparison.draw.difference.toFixed(2)}</div>
                    </div>
                </div>
                <div class="difference">
                    ${data.comparison.draw.percentageDiff.toFixed(2)}% difference
                </div>
            </div>
            
            <div class="comparison-item">
                <div class="comparison-header">Away Win</div>
                <div class="comparison-values">
                    <div class="value-box">
                        <span class="value-label">AI Prediction</span>
                        <div class="value-number">${data.comparison.awayWin.llm.toFixed(2)}</div>
                    </div>
                    <div class="value-box">
                        <span class="value-label">Actual Odds</span>
                        <div class="value-number">${data.comparison.awayWin.actual.toFixed(2)}</div>
                    </div>
                    <div class="value-box">
                        <span class="value-label">Difference</span>
                        <div class="value-number">${data.comparison.awayWin.difference.toFixed(2)}</div>
                    </div>
                </div>
                <div class="difference">
                    ${data.comparison.awayWin.percentageDiff.toFixed(2)}% difference
                </div>
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 8px;">
            <strong>Summary:</strong> The AI's closest prediction was for <strong>${data.summary.closestPrediction}</strong> 
            with an average difference of <strong>${data.summary.averageDifference}%</strong> across all outcomes.
        </div>
    `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadFixturesBtn').addEventListener('click', loadFixtures);
});
