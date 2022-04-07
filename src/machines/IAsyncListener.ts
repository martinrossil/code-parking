export default interface IAsyncListener {
    (e: CustomEvent): Promise<void>;
}
