type CustomErrorMessageProps = {
  message: string;
};

export const CustomEmailErrorMessage = ({ message }: CustomErrorMessageProps) => {
  return <div className="bg-red-500 text-white p-2 rounded-md">{message}</div>;
};
