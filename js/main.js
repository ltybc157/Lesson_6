let Btnstart = document.getElementById('start');
budgetValue = document.getElementsByClassName('budget-value')[0], //1
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0], //2
    levelValue = document.getElementsByClassName('level-value')[0], //3
    expensesValue = document.getElementsByClassName('expenses-value')[0], //4
    optionalexpensesValue = document.getElementsByClassName('optionalexpenses-value')[0], //5
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0], //7
    yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0], //8
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalexpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    persentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.disablet = true;
optionalExpensesBtn.disablet = true;
countBtn.disablet = true;

function checkInputData(incomingArr) {
    for (let i = 0; i < incomingArr.length; i++) {
        if (incomingArr[i].value == '') {
            return true;
        }
    }
    return false;
}
//------------------------------------------------------------
Btnstart.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt("Ваш бюджет на месяц", '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц", '');
    }
    appDate.budget = money;
    appDate.timeDate = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
    expensesBtn.disablet = false;
    optionalExpensesBtn.disablet = false;
    countBtn.disablet = false;

});
//-------------------------------------------------------------

expensesBtn.addEventListener('click', function () {
    if (checkInputData(expensesItem) == false) {
        let sum = 0;

        for (let i = 0; i < expensesItem.length; i++) {
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;

            if ((typeof (a)) === 'string' && (typeof (a)) != null && (typeof (b)) != null &&
                a != '' && b != '' && a.length < 50) {
                console.log("done");
                appDate.expenses[a] = b;
                sum += +b;

            } else {
                i = i - 1;
            }
        }
        expensesValue.textContent = sum;

    } else {
        expensesValue.textContent = "Нестаточно данных";
    }
});

optionalExpensesBtn.addEventListener('click', function () {
    if (checkInputData(optionalexpensesItem) === false) {
        for (let i = 0; i < optionalexpensesItem.length; i++) {
            let opt = optionalexpensesItem[i].value;
            appDate.optionalExpenses[i] = opt;
            optionalexpensesValue.textContent += appDate.optionalExpenses[i] + ' ';
        }
    } else {
        optionalexpensesValue.textContent = '';
    }

});

countBtn.addEventListener('click', function () {
    if (appDate.budget != undefined) {
        appDate.moneyPerDay = ((appDate.budget - +expensesValue.textContent) / 30).toFixed();
        daybudgetValue.textContent = appDate.moneyPerDay;
        console.log(expensesValue);



        if (appDate.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appDate.moneyPerDay > 100 && appDate.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень доставка";
        } else if (appDate.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "";
        }
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }
});
incomeItem.addEventListener('input', function () {

    let items = incomeItem.value;
    appDate.income = items.split(', ');
    incomeValue.textContent = appDate.income;

});

checkSavings.addEventListener('click', function () {
    if (appDate.savings == true) {
        appDate.savings = false;
    } else {
        appDate.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appDate.savings == true) {
        let sum = +sumValue.value,
            percent = +persentValue.value;

        appDate.monthIncome = sum / 100 / 12 * percent;
        appDate.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appDate.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appDate.yearIncome.toFixed(1);
    }
});

persentValue.addEventListener('input', function () {
    if (appDate.savings == true) {
        let sum = +sumValue.value,
            percent = +persentValue.value;

        appDate.monthIncome = sum / 100 / 12 * percent;
        appDate.yearIncome = sum / 100 * percent;

        monthsavingsValue.textContent = appDate.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appDate.yearIncome.toFixed(1);
    }
});



let appDate = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeDate: time,
    savings: false,
}; /**/