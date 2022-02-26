let pathNumber = 1;
let allLinks = [];
let treeParams;

// scg path params
let strokeWidth = '5px';
let strokeColor = '#000000';

function treeMaker(tree, params) {
    let container = document.getElementById(params.id);
    treeParams = params.treeParams === undefined ? {} : params.treeParams;

    if (params.link_width !== undefined) strokeWidth = params.link_width;
    if (params.link_color !== undefined) strokeColor = params.link_color;

    // reset pathNumber and allLinks globals to allow on-click function to re-call treeMaker()
    pathNumber = 1;
    allLinks = [];

    // svg part
    const svgDiv = document.createElement('div');
    svgDiv.id = 'tree__svg-container';
    container.appendChild(svgDiv);
    const svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.id = 'tree__svg-container__svg';
    svgDiv.appendChild(svgContainer);

    // html part
    const treeContainer = document.createElement('div');
    treeContainer.id = 'tree__container';
    container.appendChild(treeContainer);
    const card = document.createElement('div');
    card.classList = 'tree__container__step__card';
    card.id = 'tree__container__step__card__first';
    treeContainer.appendChild(card);
    const trad = treeParams[Object.keys(tree)[0]] !== undefined && treeParams[Object.keys(tree)[0]].trad !== undefined ? treeParams[Object.keys(tree)[0]].trad : Object.keys(tree)[0].trad;
    card.innerHTML = `<p class="tree__container__step__card__p" id="card_${Object.keys(tree)[0]}">${trad}</p>`;

    addStyleToCard(treeParams[Object.keys(tree)[0]], Object.keys(tree)[0]);

    iterate(tree[Object.keys(tree)[0]], true, 'tree__container__step__card__first');

    connectCard();

    const allCards = document.querySelectorAll('.tree__container__step__card__p');
    allCards.forEach((card) => {
        card.addEventListener('click', function (event) {
            if (typeof params.card_click === 'function'){
                params.card_click(event.target);
            }
        });
    })

    window.onresize = function () {
        svgDiv.setAttribute('height', '0');
        svgDiv.setAttribute('width', '0');
        connectCard();
    };
}

function connectCard() {
    // magic
    const svg = document.getElementById('tree__svg-container__svg');
    for (let i = 0; allLinks.length > i; i++) {
        connectElements(svg, document.getElementById(allLinks[i][0]), document.getElementById(allLinks[i][1]), document.getElementById(allLinks[i][2]));
    }
}

function iterate(tree, start, from) {
    const svgContainer = document.getElementById('tree__svg-container__svg');
    const treeContainer = document.createElement('div');
    treeContainer.classList.add('tree__container__branch', `from_${from}`);
    document.getElementById(from).after(treeContainer);

    for (const key in tree) {
        const textCard = treeParams[key] !== undefined && treeParams[key].trad !== undefined ? treeParams[key].trad : key;

        if (!document.getElementById(`card_${key}`)){
            treeContainer.innerHTML += `<div class="tree__container__step"><div class="tree__container__step__card" id="${key}"><p id="card_${key}" class="tree__container__step__card__p">${textCard}</p></div></div>`;
            addStyleToCard(treeParams[key], key);
        }

        if ((from && !start) || start){
            const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            newPath.id = "path" + pathNumber;
            newPath.setAttribute('stroke', strokeColor);
            newPath.setAttribute('fill', 'none');
            newPath.setAttribute('stroke-width', strokeWidth);
            svgContainer.appendChild(newPath);
            allLinks.push(['path' + pathNumber, from ? from : 'tree__container__step__card__first', key]);
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
        for (const cssRules in treeParams[key].styles) {
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
    const svgContainer = document.getElementById('tree__svg-container');

    // if first element is lower than the second, swap!
    if (startElem.offsetTop > endElem.offsetTop) {
        const temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    const svgTop = svgContainer.offsetTop;
    const svgLeft = svgContainer.offsetLeft;

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    const startX = startElem.offsetLeft + 0.5 * startElem.offsetWidth - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    const startY = startElem.offsetTop + startElem.offsetHeight - svgTop;        // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    const endX = endElem.offsetLeft + 0.5 * endElem.offsetWidth - svgLeft;
    const endY = endElem.offsetTop - svgTop;

    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
}
