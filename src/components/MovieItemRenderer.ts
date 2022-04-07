import { DataRenderer, ILabelElement, ILinkContainer, LinkContainer, VerticalLayout } from 'enta';
import SerifLabel from './SerifLabel';
import Colors from '../theme/Colors';
import BackdropImage from './BackdropImage';
import IMovie from '../dto/IMovie';

export default class MovieItemRenderer extends DataRenderer<IMovie> {
    public constructor() {
        super();
        this.clip = 'hidden';
        this.layout = new VerticalLayout(16);
        this.paddingBottom = 16;
        this.addElements([this.linkContainer, this.titleLabel]);
    }

    protected dataChanged(): void {
        if (this.data) {
            this.titleLabel.text = this.data.title;
            this.image.alt = this.data.title;
            this.image.source = 'https://filmdb.pages.dev/images/backdrop/w300/' + this.data.uid;
            this.linkContainer.href = 'https://filmdb.pages.dev/film/' + this.data.uid;
        }
    }

    private _linkContainer!: ILinkContainer;
    private get linkContainer(): ILinkContainer {
        if (!this._linkContainer) {
            this._linkContainer = new LinkContainer();
            this._linkContainer.percentWidth = 100;
            this._linkContainer.addElement(this.image);
        }
        return this._linkContainer;
    }

    private _image!: BackdropImage;
    private get image(): BackdropImage {
        if (!this._image) {
            this._image = new BackdropImage();
        }
        return this._image;
    }

    private _titleLabel!: ILabelElement;
    private get titleLabel(): ILabelElement {
        if (!this._titleLabel) {
            this._titleLabel = new SerifLabel(16, Colors.BLUE_LIGHTEST);
            this._titleLabel.percentWidth = 100;
        }
        return this._titleLabel;
    }
}
customElements.define('movie-item-renderer', MovieItemRenderer);
