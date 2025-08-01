document.getElementById('inputValue').addEventListener('input', convert);
document.getElementById('fromUnit').addEventListener('change', convert);
document.getElementById('toUnit').addEventListener('change', convert);

const conversions = {
   
    tsp: { ml: 4.92892, type: 'volume' },
    tbsp: { ml: 14.7868, type: 'volume' },
    floz: { ml: 29.5735, type: 'volume' },
    cup: { ml: 236.588, type: 'volume' },
    pint: { ml: 473.176, type: 'volume' },
    quart: { ml: 946.353, type: 'volume' },
    gallon: { ml: 3785.41, type: 'volume' },
    ml: { ml: 1, type: 'volume' },
    liter: { ml: 1000, type: 'volume' },
    dash: { ml: 0.918, type: 'volume' },
    stick: { ml: 14.7868, type: 'volume' }, 
    pinch: { ml: 0.308, type: 'volume' },
    smidgen: { ml: 0.5, type: 'volume' },
    drop: { ml: 0.05, type: 'volume' }, 
    handful: { ml: 100, type: 'volume' },
    bunch: { ml: 100, type: 'volume' },
    clove: { ml: 5, type: 'volume' },
    slice: { ml: 10, type: 'volume' },
    piece: { ml: 20, type: 'volume' },
    chunk: { ml: 30, type: 'volume' },
    sprig: { ml: 2, type: 'volume' },
    floret: { ml: 3, type: 'volume' },
    strip: { ml: 5, type: 'volume' },
    wedge: { ml: 10, type: 'volume' },
    cube: { ml: 15, type: 'volume' },
    ball: { ml: 20, type: 'volume' },
    log: { ml: 50, type: 'volume' },
    pat: { ml: 5, type: 'volume' },
    disk: { ml: 10, type: 'volume' },
    bar: { ml: 15, type: 'volume' },
    block: { ml: 20, type: 'volume' },
    wheel: { ml: 30, type: 'volume' },
   

    

 
    g: { g: 1, type: 'weight' },
    kg: { g: 1000, type: 'weight' },
    oz: { g: 28.3495, type: 'weight' },
    lb: { g: 453.592, type: 'weight' }
};


function convert() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    if (isNaN(inputValue)) {
        document.getElementById('result').textContent = 'Please enter a valid number';
        return;
    }

   
    if (conversions[fromUnit].type !== conversions[toUnit].type) {
        document.getElementById('result').textContent =
            'Cannot convert between volume and weight units';
        return;
    }

    
    const baseValue =
        conversions[fromUnit].type === 'volume'
            ? inputValue * conversions[fromUnit].ml
            : inputValue * conversions[fromUnit].g;

   
    const result =
        conversions[toUnit].type === 'volume'
            ? baseValue / conversions[toUnit].ml
            : baseValue / conversions[toUnit].g;

    document.getElementById('outputValue').value = result.toFixed(2);
    document.getElementById('result').textContent =
        `${inputValue} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
}


function swapUnits() {
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

   
    const temp = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = temp;


    convert();
}