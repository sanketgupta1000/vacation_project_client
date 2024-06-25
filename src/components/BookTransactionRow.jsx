import { Link } from "react-router-dom";

function BookTransactionRow({BookTransactionDTO})
{
    return (
        <>
        <div>
        <h3>{BookTransactionDTO.transactionId}</h3>
        <h3>{BookTransactionDTO.bookId}</h3>
        <h3>{BookTransactionDTO.bookCopyId}</h3>
        <h3>{BookTransactionDTO.bookTitle}</h3>
        <h3>{BookTransactionDTO.bookGiverFullName}</h3>
        <h3>{BookTransactionDTO.bookGiverEmail}</h3>
        <h3>{BookTransactionDTO.bookReceiverFullName}</h3>
        <h3>{BookTransactionDTO.bookReceiverEmail}</h3>
        <h3>{BookTransactionDTO.transactionDate}</h3>
        <h3>{BookTransactionDTO.transactionTime}</h3>
        </div>
        </>
    );
}
export default BookTransactionRow;