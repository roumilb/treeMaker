let pathNumber = 1;
let allLinks = [];
let treeParamas;

// scg path params
let strokeWidth = '5px';
let strokeColor = '#000000';

function treeMaker(tree, params) {
    let container = document.getElementById(params.id);
    treeParamas = params.treeParams === undefined ? {} : params.treeParams;

    if (params.link_width !== undefined) strokeWidth = params.link_width;
    if (params.link_color !== undefined) strokeColor = params.link_color;

    // reset pathNumber and allLinks globals to allow on-click function to re-call treeMaker()
    pathNumber = 1;
    allLinks = [];

    // svg part
    let svgDiv = document.createElement('div');
    svgDiv.id = 'tree__svg-container';
    container.appendChild(svgDiv);
    let svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.id = 'tree__svg-container__svg';
    svgDiv.appendChild(svgContainer);

    // html part
    let treeContainer = document.createElement('div');
    treeContainer.id = 'tree__container';
    container.appendChild(treeContainer);
    let card = document.createElement('div');
    card.classList = 'tree__container__step__card';
    card.id = 'tree__container__step__card__first';
    treeContainer.appendChild(card);
    let trad = treeParamas[Object.keys(tree)[0]] !== undefined && treeParamas[Object.keys(tree)[0]].trad !== undefined ? treeParamas[Object.keys(tree)[0]].trad : Object.keys(tree)[0].trad;
    card.innerHTML = '<p class="tree__container__step__card__p" id="card_' + Object.keys(tree)[0] + '">' + trad + '</p>';

    addStyleToCard(treeParamas[Object.keys(tree)[0]], Object.keys(tree)[0]);

    iterate(tree[Object.keys(tree)[0]], true, 'tree__container__step__card__first');

    connectCard();

    let allCards = document.querySelectorAll('.tree__container__step__card__p');
    for (let i = 0; allCards.length > i; i++) {
        allCards[i].addEventListener('click', function (event) {
            params.card_click(event.target);
        });
    }

    window.onresize = function () {
        svgDiv.setAttribute('height', '0');
        svgDiv.setAttribute('width', '0');
        connectCard();
    };
}

function connectCard() {
    // magic
    let svg = document.getElementById('tree__svg-container__svg');
    for (let i = 0; allLinks.length > i; i++) {
        connectElements(svg, document.getElementById(allLinks[i][0]), document.getElementById(allLinks[i][1]), document.getElementById(allLinks[i][2]));
    }
}

function iterate(tree, start = false, from = '') {
    let svgContainer = document.getElementById('tree__svg-container__svg');
    let treeContainer = document.createElement('div');
    treeContainer.id = 'from_' + from;
    treeContainer.classList.add('tree__container__branch');
    document.getElementById(from).after(treeContainer);

    for (const key in tree) {

        let textCard = treeParamas[key] !== undefined && treeParamas[key].trad !== undefined ? treeParamas[key].trad : key;

        treeContainer.innerHTML += '<div class="tree__container__step"><div class="tree__container__step__card" id="' + key + '"><p id="card_' + key + '" class="tree__container__step__card__p">' + textCard + '</p></div></div>';
        addStyleToCard(treeParamas[key], key);
        if ('' !== from && !start) {
            let newpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            newpath.id = "path" + pathNumber;
            newpath.setAttribute('stroke', strokeColor);
            newpath.setAttribute('fill', 'none');
            newpath.setAttribute('stroke-width', strokeWidth);
            svgContainer.appendChild(newpath);
            allLinks.push(['path' + pathNumber, from, key]);
            pathNumber++;
        }
        if (start) {
            // svgContainer.innerHTML = svgContainer.innerHTML + '<path id="path' + pathNumber + '" d="M0 0" stroke="#2199e8" fill="none" stroke-width="5";/>';
            let newpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            newpath.id = "path" + pathNumber;
            newpath.setAttribute('stroke', strokeColor);
            newpath.setAttribute('fill', 'none');
            newpath.setAttribute('stroke-width', strokeWidth);
            svgContainer.appendChild(newpath);
            allLinks.push(['path' + pathNumber, 'tree__container__step__card__first', key]);
            pathNumber++;
        }

        if (Object.keys(tree[key]).length > 0) {
            iterate(tree[key], false, key);
        }
    }
}

function addStyleToCard(card, key) {
    if (card !== undefined && card.styles !== undefined) {
        let lastCard = document.getElementById('card_' + key);
        for (const cssRules in treeParamas[key].styles) {
            lastCard.style[cssRules] = card.styles[cssRules];
        }
    }
}

function signum(x) {
    return (x < 0)
        ? -1
        : 1;
}

function absolute(x) {
    return (x < 0)
        ? -x
        : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    let stroke = parseFloat(path.getAttribute("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.getAttribute("height") < endY) svg.setAttribute("height", endY);
    if (svg.getAttribute("width") < (startX + stroke)) svg.setAttribute("width", (startX + stroke));
    if (svg.getAttribute("width") < (endX + stroke)) svg.setAttribute("width", (endX + stroke));

    let deltaX = (endX - startX) * 0.15;
    let deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    let delta = deltaY < absolute(deltaX)
        ? deltaY
        : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    let arc1 = 0;
    let arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    path.setAttribute("d", "M" + startX + " " + startY + " V" + (startY + delta) + " A" + delta + " " + delta + " 0 0 " + arc1 + " " + (startX + delta * signum(deltaX)) + " " + (startY + 2 * delta) + " H" + (endX - delta * signum(deltaX)) + " A" + delta + " " + delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3 * delta) + " V" + endY);
}

function connectElements(svg, path, startElem, endElem) {
    let svgContainer = document.getElementById('tree__svg-container');

    // if first element is lower than the second, swap!
    if (startElem.offsetTop > endElem.offsetTop) {
        let temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    let svgTop = svgContainer.offsetTop;
    let svgLeft = svgContainer.offsetLeft;

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    let startX = startElem.offsetLeft + 0.5 * startElem.offsetWidth - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    let startY = startElem.offsetTop + startElem.offsetHeight - svgTop;        // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    let endX = endElem.offsetLeft + 0.5 * endElem.offsetWidth - svgLeft;
    let endY = endElem.offsetTop - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
}
