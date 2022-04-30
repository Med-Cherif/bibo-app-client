import moment from "moment";

export const calculateTime = (dateInString: string) => {
    const date = new Date(dateInString)
    return moment(date, 'YYYY-MM-DDTh:mm:ss').fromNow();
}