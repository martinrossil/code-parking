import FilmDB from '../FilmDB';
import APIMachine from './APIMachine';
import LinkMachine from './LinkMachine';
import NavigationMachine from './NavigationMachine';
import ResponsiveMachine from './ResponsiveMachine';
import RoutingMachine from './RoutingMachine';

export default class FilmDBMachines {
    public constructor(filmDB: FilmDB) {
        new ResponsiveMachine(filmDB);
        new NavigationMachine(filmDB);
        new RoutingMachine(filmDB);
        new LinkMachine(filmDB);
        new APIMachine(filmDB);
    }
}
