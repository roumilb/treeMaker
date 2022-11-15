# treeMaker

This javascript library allows you to make tree in HTML from JSON.

![screen shot](https://i.ibb.co/VVXFQFM/libtree.png)

# Installation

``npm install --save @roumi/treemaker``

# How it works

Add a div to your page where you want your tree:
````html
<div id="my_tree"></div>
````

Then add this javascript code
````javascript
import treeMaker from 'tree-maker'

//The structure of your tree
const tree = {
        key_1: {
            key_2: '',
            key_3: '',
            key_4: '',
            key_5: ''
        },
    };

//The parameters of your tree
const params = {
    key_1: {trad: 'Card 1', styles: {'box-shadow': '0 0 15px 2px blue'}},
    key_2: {trad: 'Card 2', styles: {'color': 'red'}},
    key_3: {trad: 'Card 3'},
    key_4: {trad: 'Card 4'},
    key_5: {trad: 'Card 5'},
};

//The function which will build the tree
treeMaker(tree, {
    id: 'my_tree', card_click: function (element) {
        console.log(element);
    },
    treeParams: params,
    'link_width': '4px',
    'link_color': '#ff5259',
});
````
## How to build your JSON tree

You need to create an object which contains either other object if you want to continue the tree or an empty string if there are no more step to your tree.
You need to fill the tree with keys which are used in the tree parameters.

## Tree options

``trad:`` the text that will be showed in the card, if there is no trad the key will be showed
``styles:`` the style you want to add to a specific card, every CSS rules will worked

## treeMaker()

This function takes 2 arguments: the tree in JSON and parameters which is an object.

### Parameters:
| Params | Required | Description |
| :---: | :---: | --- |
| ``id:`` | yes | The id where the library will generate the tree |
| ``card_click:`` | no | This a call back function when a card is clicked |
| ``treeParams:`` | yes | An object which contains the options for the tree card |
| ``link_width:`` | no | The width of the svg that linked the cards |
| ``link_color:`` | no | The color of the svg that linked the cards |

## Using the inline method

If you want to use the inline method you can download the build folder and then build you html file like the one in examples/index.js

# License

This library is available under the MIT license
