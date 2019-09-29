import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faIgloo, faUser, faCog, faSignOutAlt, faTimesCircle, faCheckCircle, faCoins, faMoneyBill, faLock,
  faMoneyCheckAlt, faCashRegister, faCalendarAlt, faExchangeAlt, faSearchPlus, faWindowClose, faPowerOff,
  faPlus, faMinus
} from '@fortawesome/free-solid-svg-icons'

const icons = {
  initialize() {
    library.add(faIgloo);
    library.add(faUser);
    library.add(faCog);
    library.add(faSignOutAlt);
    library.add(faTimesCircle);
    library.add(faCheckCircle);
    library.add(faCoins);
    library.add(faMoneyBill);
    library.add(faLock);
    library.add(faMoneyCheckAlt);
    library.add(faCashRegister);
    library.add(faCalendarAlt);
    library.add(faExchangeAlt);
    library.add(faSearchPlus);
    library.add(faWindowClose);
    library.add(faPowerOff);
    library.add(faPlus);
    library.add(faMinus);
  }
};

export default icons;
