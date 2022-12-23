export const toMoneyStringFormat = (money: number) => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
