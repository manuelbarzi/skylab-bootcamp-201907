console.log(process.argv.slice(2).reduce((accumulator, currentValue) => Number(accumulator) + Number(currentValue)))