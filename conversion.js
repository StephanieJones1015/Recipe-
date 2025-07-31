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