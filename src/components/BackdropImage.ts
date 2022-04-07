import { ImageElement } from 'enta';
import Colors from '../theme/Colors';

export default class BackdropImage extends ImageElement {
    public constructor() {
        super();
        this.name = 'BackdropImage';
        this.backgroundColor = Colors.BLUE_DARK;
        this.objectFit = 'cover';
        this.percentWidth = 100;
    }

    protected validate(): void {
        if (this.actualWidth > 0) {
            this.internalHeight = this.actualWidth * 0.5625; // 9 / 16
        }
        super.validate();
    }
}
customElements.define('backdrop-image', BackdropImage);
