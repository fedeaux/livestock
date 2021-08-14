import TableHeader from 'ui/Table/Header';
import TableRow from 'ui/Table/Row';
import UserStockEarningListItem from 'entities/UserStockEarnings/List/Item';

export default function UserStockEarningList({ userStockEarnings }) {
  return (
    <View>
      <TableRow>
        <TableHeader twp="w-20">Code</TableHeader>
        <TableHeader twp="w-20">Count</TableHeader>
        <TableHeader twp="w-20">Received</TableHeader>
        <TableHeader twp="w-20">Total</TableHeader>
      </TableRow>

      {
        userStockEarnings.map((userStockEarning) => {
          return <UserStockEarningListItem key={userStockEarning.id} userStockEarning={userStockEarning} />;
        })
      }
    </View>
  );
}
