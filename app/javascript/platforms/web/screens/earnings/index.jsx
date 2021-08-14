import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import MainTitle from 'ui/typography/MainTitle';
import UserStockEarning from 'models/user_stock_earning';
import UserStockEarningList from 'entities/UserStockEarnings/List';
import { format } from 'date-fns';
import formatMoney from 'ui/formatters/money';
import TableRow from 'ui/Table/Row';
import TableCell from 'ui/Table/Cell';
import TableHeader from 'ui/Table/Header';

async function apiUserStockEarningsIndex() {
  return fetch('api/user_stock_earnings.json').then((response) => {
    return response.json();
  }).then((data) => {
    const instances = data.userStockEarnings.map((attributes) => {
      return new UserStockEarning(attributes);
    });

    return { ...data, userStockEarnings: instances };
  });
}

function useUserStockEarningsIndex() {
  const [userStockEarnings, setUserStockEarnings] = useState([]);

  useEffect(async () => {
    const response = await apiUserStockEarningsIndex();
    setUserStockEarnings(response.userStockEarnings);
  }, []);

  return { userStockEarnings };
}

function evalUserStockEarningsByMonth(userStockEarnings) {
  const earningsByMonth = [];
  let currentMonth = null;
  let currentMonthEarnings = 0;

  userStockEarnings.forEach((userStockEarning) => {
    const userStockEarningMonth = format(userStockEarning.receivedAt, 'MMM/yy');

    if(currentMonth != userStockEarningMonth) {
      if(currentMonth) {
        earningsByMonth.push({
          month: currentMonth,
          earnings: Math.round((currentMonthEarnings + Number.EPSILON) * 100) / 100
        });
      }

      currentMonth = userStockEarningMonth;
      currentMonthEarnings = userStockEarning.total;
    } else {
      currentMonthEarnings += userStockEarning.total;
    }
  });

  earningsByMonth.push({
    month: currentMonth,
    earnings: Math.round((currentMonthEarnings + Number.EPSILON) * 100) / 100
  });

  return earningsByMonth;
}

export default function EarningsIndex() {
  const { userStockEarnings } = useUserStockEarningsIndex();
  const userStockEarningsByMonth = evalUserStockEarningsByMonth(userStockEarnings);

  return (
    <View style={ tw('p-4') }>
      <MainTitle>
        Earnings
      </MainTitle>

      <View style={ tw('flex flex-row') }>
        <View style={ tw('flex-grow pr-2') }>
          <UserStockEarningList userStockEarnings={userStockEarnings} />
        </View>
        <View style={ tw('flex-grow pl-2') }>
          <TableRow>
            <TableHeader twp="w-20">Month</TableHeader>
            <TableHeader twp="px-2">Total</TableHeader>
          </TableRow>
          {userStockEarningsByMonth.map((monthlyEarnings) => {
            return (
              <TableRow key={monthlyEarnings.month}>
                <TableCell twp="w-20">{monthlyEarnings.month}</TableCell>
                <TableCell twp="px-2">{formatMoney(monthlyEarnings.earnings)}</TableCell>
              </TableRow>
            );
          })}
        </View>
      </View>
    </View>
  );
}
