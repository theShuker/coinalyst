import { Badge } from '@/components/ui/badge';
import { getUserTransactionCategories, getUserTransactions } from '@coinalyst/services/TransactionService'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { makeTitled, removeHashtags } from '@coinalyst/utils/textUtils';

const Page = async () => {
  const latestTransactions = await getUserTransactions({});
  const userTransactionCategories = await getUserTransactionCategories({});

  return (
    <>
      <aside className="m-4">
        <h1 className="font-bold text-3xl">Dashboard</h1>
      </aside>

      <section className="grid grid-cols-2 m-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Latest expenses</CardTitle>
            <CardDescription>10 latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Description</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead className="">Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {latestTransactions.map((tr) => (
                  <TableRow key={tr.id}>
                    <TableCell className="font-bold">
                      {makeTitled(removeHashtags(tr.description))}
                    </TableCell>
                    <TableCell className="flex gap-1">
                      {tr.transactionCategories.flatMap((cat) => (
                        <Badge className="p-1 text-xs leading-none" key={cat.id}>
                          {cat.title}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell className="font-bold">{tr.amount}</TableCell>
                    <TableCell>{tr.date.toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense categories</CardTitle>
            <CardDescription>Manage ur expense categories</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Category</TableHead>
                  <TableHead># of expenses</TableHead>
                  <TableHead className="">Total this month</TableHead>
                  <TableHead>Edit</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {userTransactionCategories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-bold">
                      {makeTitled(removeHashtags(cat.title))}
                    </TableCell>
                    <TableCell className="flex gap-1">{cat.transactions.length}</TableCell>
                    <TableCell className="font-bold">
                      {cat.transactions.flatMap((tr) => tr.amount).reduce((acc, v) => acc + v, 0)}
                    </TableCell>
                    <TableCell>EDIT</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </>
  );
};
export default Page;
