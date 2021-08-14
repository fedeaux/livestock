import tableGrid from 'entities/UserStocks/Table/grid';
import TableHeader from 'ui/Table/Header';

export default function UserStockTableHeader({ position, sortKey, label, setSortBy }) {
  const onClick = useCallback(() => {
    if(sortKey && setSortBy) {
      setSortBy(sortKey);
    }
  }, [sortKey, setSortBy]);

  return (
    <TableHeader twp={tableGrid[position]} onClick={onClick}>{label}</TableHeader>
  );
}
