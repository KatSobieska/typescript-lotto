import inquirer from 'inquirer';
import PromptResult from './interfaces';


const chosenNumbers: number[] = [];
const randomNumbers: number[] = [];

const startApp = async (): Promise<void> => {
    do {
        const result: PromptResult = await inquirer.prompt([
            {
                name: 'number',
                type: 'input',
                message: 'Podaj liczbę...',
            },
        ]);
        if (validateInput(result.number)) {
            chosenNumbers.push(parseInt(result.number));
        }
    } while (chosenNumbers.length < 6);

    do {
        const number: number = randomNumber();
        if (validateRandomNumber(number)) {
            randomNumbers.push(number);
        }
    } while (randomNumbers.length < 6);

    gameResult();
};

const validateInput = (input: string): boolean => {
    const inputValue = parseInt(input);
    if (
        inputValue >= 1 &&
        inputValue <= 49 &&
        !chosenNumbers.includes(inputValue)
    ) {
        return true;
    } else return false;
};

const randomNumber = (): number => {
    return Math.floor(Math.random() * 49) + 1;
};

const validateRandomNumber = (number: number): boolean => {
    if (!randomNumbers.includes(number)) {
        return true;
    } else return false;
};

const valideSameNumbers = (): number => {
    let count = 0;
    for (let i = 0; i < randomNumbers.length; i++) {
        if (chosenNumbers.includes(randomNumbers[i])) {
            count++;
        }
    }
    return count;
};

const gameResult = (): void => {
    console.log(`You hit ${valideSameNumbers()} numbers`);
};

startApp();
