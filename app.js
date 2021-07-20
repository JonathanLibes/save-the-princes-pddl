let problem = `(define (problem problem_name)
(:domain domain_name)
(:objects
    cell-n-n - cell
    cell-0-0 - cell
    cell-0-1 - cell
    cell-0-2 - cell
    cell-1-0 - cell
    cell-1-1 - cell
    cell-1-2 - cell
    cell-2-0 - cell
    cell-2-1 - cell
    cell-2-2 - cell
)

(:init
    (connected cell-0-0 cell-0-1)
    (connected cell-0-0 cell-1-0)
    (connected cell-1-1 cell-0-1)
    (connected cell-1-1 cell-1-0)
    (connected cell-0-2 cell-1-2)
    (connected cell-0-2 cell-0-1)
    (connected cell-1-1 cell-1-2)
    (connected cell-2-1 cell-2-2)
    (connected cell-2-1 cell-2-0)
    (connected cell-2-1 cell-1-1)
    (connected cell-2-0 cell-1-0)
    (connected cell-2-2 cell-1-2)
    $
    ;todo: put the initial state's facts and numeric values here
)

(:goal
    (and
        (exists
            ( ?c - cell)
            (and (goal ?c) (hero-pos ?c) (princes-pos ?c))
        )
    )
)
)`;

let domain = `;Header and description

(define (domain domain_name)

    ;remove requirements that are not needed
    (:requirements :strips :fluents :typing :conditional-effects :negative-preconditions :equality :disjunctive-preconditions)

    (:types ;todo: enumerate types and their hierarchy here, e.g. car truck bus - vehicle
        cell player princess-status key-status
    )

    ; un-comment following line if constants are needed
    ;(:constants )
    (:constants
        cell-n-n - cell
        dragonStart - cell
        dragonEnd - cell
    )

    (:predicates ;todo: define predicates here
        (connected ?from - cell ?to - cell)
        (hero-pos ?position - cell)
        (princes-pos ?position - cell)
        (block-pos ?position - cell)
        (key-pos ?position - cell)
        (goal ?position - cell)
        (dragon-pos ?position - cell)
        (sword-pos ?position - cell)
    )
    (:functions ;todo: define numeric functions here

    )

    (:action walk
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (block-pos ?to))
            (hero-pos ?from)
            (not (sword-pos ?to))
            (not (sword-pos ?from))
            (not (princes-pos ?to))
            (not (key-pos ?to))
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-princes
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (block-pos ?to))
            (hero-pos ?from)
            (princes-pos ?from)
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (princes-pos ?from))
            (princes-pos ?to)
            (not (key-pos ?from))
            (key-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-key
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (not (block-pos ?to))
            (hero-pos ?from)
            (key-pos ?from)
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (key-pos ?from))
            (key-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-to-unlock-princes
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (key-pos ?from)
            (princes-pos ?to)
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (key-pos ?from))
            (key-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-to-pick-key
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (key-pos ?to)
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-to-pick-sword
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (sword-pos ?to)
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-with-sword
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (not (dragon-pos ?to))
            (hero-pos ?from)
            (sword-pos ?from)
            (not (block-pos ?to))
            (not (goal ?to))
            (not (princes-pos ?to))
            (not (key-pos ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (sword-pos ?from))
            (sword-pos ?to)
            (when
                (and (dragon-pos dragonStart))
                (and (dragon-pos dragonEnd) (not(dragon-pos ?dragon)))
            )
            (when
                (and (dragon-pos dragonEnd))
                (and (dragon-pos dragonStart) (not(dragon-pos ?dragon)))
            )
        )
    )
    (:action walk-to-kill-dragon
        :parameters (?from - cell ?to - cell ?dragon - cell)
        :precondition (and
            (dragon-pos ?dragon)
            (dragon-pos ?to)
            (hero-pos ?from)
            (sword-pos ?from)
            (not (princes-pos ?to))
            (not (key-pos ?to))
            (not (goal ?to))
            (or (connected ?from ?to) (connected ?to ?from))
        )
        :effect (and
            (not (hero-pos ?from))
            (hero-pos ?to)
            (not (dragon-pos ?to))
            (dragon-pos cell-n-n)
        )
    )
)`;
let newDomain;
const actionToFuncitonMap = {
    'walk': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'walk-to-pick-key': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'walk-to-unlock-princes': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        moveOnBoard('key', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'walk-with-key': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        moveOnBoard('key', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'walk-with-sword': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        moveOnBoard('sword', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'walk-to-pick-sword': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'walk-to-kill-dragon': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        moveOnBoard('sword', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'walk-with-princes': ([from, to, dragonPos]) => {
        moveOnBoard('hero', extractCell(from), extractCell(to));
        // moveOnBoard('key', extractCell(from), extractCell(to));
        moveOnBoard('princess', extractCell(from), extractCell(to));
        moveOnBoard('dragon', extractCell(dragonPos));
    },
    'hero-pos': ([position]) => {
        addToBoard('hero', extractCell(position));
    },
    'princes-pos': ([position]) => {
        addToBoard('princess', extractCell(position));
    },
    'key-pos': ([position]) => {
        addToBoard('key', extractCell(position));
    },
    'block-pos': ([position]) => {
        addToBoard('block', extractCell(position));
    },
    'dragon-pos': ([position]) => {
        addToBoard('dragon', extractCell(position));
    },
    'sword-pos': ([position]) => {
        addToBoard('sword', extractCell(position));
    },
    'goal': ([position]) => {
        addToBoard('goal', extractCell(position));
    }
}
let initString = '';

const GAME_SPEED = 500;
let onSelectionMode = false;
let characterSelected = '';
let stepsArray = '';
const boardHtmlElement = document.querySelector('.board');
let gameMatrix;

function initMatrix() {
    gameMatrix = [];
    for (var i = 0; i < 3; i++) {
        gameMatrix[i] = [[], [], []];
    }
}

function initBoard(splitterChar) {
    let actionsAndTimwArray = initString.split(splitterChar);
    actionsAndTimwArray.forEach(actionString => {
        const { action, params } = extractActionAndParams(actionString);
        action && action(params)
    });
}

function startSolution(sol) {
    $('.solve').addClass('disabled');
    $('.repeat').addClass('disabled');
    $('.reset').addClass('disabled');
    actionsAndTimwArray = sol;
    document.querySelector('.steps').innerHTML = actionsAndTimwArray.length;
    actionsAndTimwArray.forEach((actionString, index) => {
        setTimeout(() => {
            document.querySelector('.current-step').innerHTML = index + 1;
            const { action, params } = extractActionAndParams(actionString);
            action(params)
            debugger
            console.log(index);
            if (index === actionsAndTimwArray.length - 1) {
                $('.repeat').removeClass('disabled');
                $('.reset').removeClass('disabled');
            }
        }, (index + 1) * GAME_SPEED);
    });
}


function extractActionAndParams(actionString) {
    const actionAndParamsArray = actionString.replace('(', '').replace(')', '').split(' ');
    return { action: actionToFuncitonMap[actionAndParamsArray[0]], params: actionAndParamsArray.slice(1) };
};

function extractCell(cellString) {
    const [x, y] = cellString.split('-').slice(1);
    return { x, y };
}

function addToBoard(figure, { x, y }) {
    const figureHtmlElment = `<img data-figure="${figure}" src="./${figure}.png" onerror="this.src='./${figure}.gif';"/>`
    if (!gameMatrix[x][y].length)
        gameMatrix[x][y] = []
    gameMatrix[x][y].push(figureHtmlElment);
    drawBoard();
}
let dragonFirst = true;
function moveOnBoard(figure, from, to) {
    const figureHtmlElment = `<img data-figure="${figure}" src="./${figure}.png" onerror="this.src='./${figure}.gif';"/>`
    if (figure == 'dragon') {
        let x, y;
        gameMatrix.forEach((row, i) => row.forEach((cell, j) => {
            if (cell[0])
                cell.forEach(element => { if (element.indexOf('dragon') > 0) { x = i; y = j; } });
        }))
        if (Number.isInteger(y) && Number.isInteger(x)) {
            const figureIndex = gameMatrix[x][y].indexOf(figureHtmlElment);
            gameMatrix[x][y].splice(figureIndex, 1);
        }
        to = from;
    }
    else {
        const prevCell = gameMatrix[from.x][from.y];
        const figureIndex = prevCell.indexOf(figureHtmlElment);
        prevCell.splice(figureIndex, 1);
    }
    debugger
    if (Number.isInteger(+to.y) && Number.isInteger(+to.x)) {
        const nextCell = gameMatrix[to.x][to.y];
        nextCell.push(figureHtmlElment);
    }
    drawBoard();
}
function drawBoard() {
    boardHtmlElement.innerHTML = '';
    gameMatrix.forEach((row, row_i) => row.forEach((cell, col_i) => {
        boardHtmlElement.append(Object.assign(document.createElement("div"), { id: `${row_i}-${col_i}`, className: 'cell', onclick: onCellSelection, innerHTML: cell.map(figure => figure) }));
    }));
};

let cursor;
function onCharacterSelection(event) {
    if (onSelectionMode) {
        $(`#${characterSelected}`).css('backgroundColor', '');
        if (event.target.id === characterSelected) {
            characterSelected = '';
            onSelectionMode = false;
            return;
        }
    }
    characterSelected = event.target.id;
    event.target.style.backgroundColor = '#00ffff63';
    onSelectionMode = true;
}

function onCellSelection(event) {
    if (!onSelectionMode) return;
    const pos = event.target.id;
    if (characterSelected === "dragon-pos") {
        initDragon(pos);
    }
    const actionAsString = `(${characterSelected} cell-${pos})`;

    initString += actionAsString + '\n';

    const { action, params } = extractActionAndParams(actionAsString);
    if (characterSelected != 'block-pos') $(`#${characterSelected}`).css('display', 'none');
    characterSelected = '';
    onSelectionMode = false;

    let images = $('.characters img');

    if ([$('img#key-pos')[0], $('img#princes-pos')[0], $('img#hero-pos')[0], $('img#goal')[0], $('img#dragon-pos')[0]].every(el => el.style.display === 'none')) {
        $('.solve').removeClass('disabled');
    }

    action(params);
}

function initDragon(pos) {
    const [x, y] = pos.split('-');
    const nextPos = Object.assign({}, { x: (x == 0) ? Number(x + 1) : Number(x - 1), y });
    const posString = `cell-${x}-${y}`;
    const nextPosString = `cell-${nextPos.x}-${nextPos.y}`;
    newDomain = domain.replaceAll('dragonStart', posString).replaceAll('dragonEnd', nextPosString);
}

function repeatLastSol() {
    // if (stage == 'custom') {
    initMatrix();
    initBoard('\n');
    drawBoard();
    startSolution(stepsArray);
    // }
}

function reset() {
    initMatrix();
    selectStage('custom');
    initString = '';
    onSelectionMode = false;
    characterSelected = '';
    stepsArray = '';
    document.querySelector('.steps').innerHTML = '';
    document.querySelector('.current-step').innerHTML = '0';

    $('.characters img').css('display', 'block');
    $('.characters img').css('backgroundColor', '');
    $('.solve').addClass('disabled');
    $('.repeat').addClass('disabled');
    drawBoard();
}



function solve() {

    const newProblem = problem.replace('$', initString);

    $.ajax({
        url: "http://solver.planning.domains/solve-and-validate",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify({
            "domain": newDomain,
            "problem": newProblem
        })
    })
        .done(function (res) {
            if (res['status'] === 'ok') {
                stepsArray = res.result.plan.map(step => step.name);
                startSolution(stepsArray)
            } else {
                window.alert(`lanning failed: ${JSON.stringify(res)}`);
            }
            console.log(res);
        }
        );
}

var stage = 'custom';
const selectElement = document.getElementById('menu1');
function selectStage(selectedStage) {
    stage = selectedStage;
    $('.repeat').addClass('disabled');

    let initFunc = {
        1: () => initString = this[`problem${stage}`],
        2: () => initString = this[`problem${stage}`],
        3: () => initString = this[`problem${stage}`],
        custom: () => { initString = '' }
    }[stage];
    if (stage == 'custom') {
        let images = $('.characters img');
        selectElement.innerText = 'custom';
        Array.from(images).forEach(el => { el.style.display = 'block'; el.style['backgroundColor'] = ''; });
        // if ([$('img#key-pos')[0], $('img#princes-pos')[0], $('img#hero-pos')[0], $('img#goal')[0], $('img#dragon-pos')[0]].every(el => el.style.display === 'none')) {
        //     $('.solve').removeClass('disabled');
        // }
    }
    else {
        selectElement.innerText = `problem #${selectedStage}`;
    }
    $('.characters').css('opacity', stage === 'custom' ? '1' : '0');
    initMatrix();
    drawBoard();
    initFunc();
    initDragon(initString.split('dragon-pos cell-')[1].replace(')', ''));
    initBoard('\n');
    $('.solve').removeClass('disabled');
}
initMatrix()
drawBoard();
var problem1 = '(goal cell-1-1)\n(princes-pos cell-0-0)\n(key-pos cell-0-1)\n(hero-pos cell-0-2)\n(dragon-pos cell-2-0)';
var problem2 = '(princes-pos cell-1-1)\n(goal cell-2-2)\n(block-pos cell-2-1)\n(key-pos cell-2-0)\n(hero-pos cell-0-2)\n(sword-pos cell-1-2)\n(dragon-pos cell-1-0)\n';
var problem3 = '(princes-pos cell-1-2)\n(goal cell-2-2)\n(block-pos cell-1-1)\n(key-pos cell-2-0)\n(hero-pos cell-0-0)\n(sword-pos cell-0-1)\n(dragon-pos cell-1-0)\n';

selectStage('custom');
