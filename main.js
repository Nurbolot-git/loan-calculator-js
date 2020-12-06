// Значение из текстовх  инпутов

const totalCost = document.getElementById('total-cost');
const anInitialFee = document.getElementById('an-initial-fee');
const creditTerm = document.getElementById('credit-term');

// Значение из range  инпутов

const totalCostRange = document.getElementById('total-cost-range');
const anInitialFeeRange = document.getElementById('an-initial-fee-range');
const creditTermRange = document.getElementById('credit-term-range');

// Итоговые значение

const amountredit = document.getElementById('amount-of-credit');
const totalmonthlyPayment = document.getElementById('monthly-payment');
const recommendedIncome = document.getElementById('recommended-income');

// all ranges

const inputaRanges = document.querySelectorAll('.input-range');

// all bottons with percen prorerties

const bankBtns = document.querySelectorAll('.bank');

const assinValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}
assinValue();

const banks = [
    {
        name: 'alfa',
        percent: 8.7
    },
    {
        name: 'sberbank',
        percent: 8.4
    },
    {
        name: 'pochta',
        percent: 7.9
    },
    {
        name: 'tinkoff',
        percent: 9.2
    }
];

let currentPercent = banks[0].percent;

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
};
const takeActiveBank = currentActive => {
    const dataAttValue = currentActive.dataset.name; //data - name="alfa" 
    const currentBank = banks.find(bank => bank.name === dataAttValue); //  comparing with banks(массив) and data-name="alfa"(in HTML)
    currentPercent = currentBank.percent;

    calculation(totalCost.value, anInitialFee.value, creditTerm.value);

};

for (let input of inputaRanges) {
    input.addEventListener('input',() => {
        assinValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
};
const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    // ЕП - Ежемесячный платеж
    // РК - Размер кридита
    // ПС - Проентная ставка
    // КМ - Количество месяца
    // ЕП = ( РК + ((( РК / 100  ) *ПС ) /12 ) *КМ ) /КМ;


    let monthlyPayment; // Ежемесячный платеж
    let loundAmount = totalCost - anInitialFee;// Размер кридита
    let interestRate = currentPercent; //Проентная ставка
    let nurmberofYears = creditTerm; //Количество лет
    let numberofMonths = 12 * nurmberofYears; //Количество месяца

    monthlyPayment = (loundAmount + (((loundAmount / 100) * interestRate) / 12) * numberofMonths) / numberofMonths;
    const monthlyPaymentArounded = Math.round(monthlyPayment);

    if (monthlyPaymentArounded < 0) {
        return false;
    } else {
        amountredit.innerHTML = `${loundAmount}₽`;
        totalmonthlyPayment.innerHTML = `${monthlyPaymentArounded}₽`;
        recommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)}₽`;
    }

};
