import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser, faSearch
} from '@fortawesome/free-solid-svg-icons'

const icons = {
  initialize() {
    library.add(faUser);
    library.add(faSearch);
  }
};

export default icons;
