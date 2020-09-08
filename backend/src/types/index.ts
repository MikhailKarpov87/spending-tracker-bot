interface ErrorInterfaceConstructor extends Error {
  new (statusCode: number, message: string): ErrorInterface;
}

interface ErrorInterface extends Error {
  statusCode: number;
  message: string;
}

type SortOption = {
  id: string;
  sort: object;
};

type PeriodOption = {
  id: string;
  dateFrom(date: Date): Date;
  dateTo(date: Date): Date;
};

export { ErrorInterfaceConstructor, ErrorInterface, SortOption, PeriodOption };
