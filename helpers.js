
export const listOfCommands = () => {
    const commands = ['add-book', 'add-user', 'borrow-book', 'return-book', 'list-books'];

    console.log('Available commands: \n');
    for (const command of commands) {
        console.log(command);
    }
}