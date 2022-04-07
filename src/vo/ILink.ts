import { IEventDispatcher } from 'fuix';

export default interface ILink extends IEventDispatcher {
    href: string;
    label: string;
    selected: boolean;
    slug: string;
}
