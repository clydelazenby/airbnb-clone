import { Controller } from '@hotwired/stimulus'
import axios from 'axios';

export default class extends Controller {
  favorite() {
    if (this.element.dataset.userLoggedIn === 'false') {
      return document.querySelector('[data-header-target="userAuthLink"]').click();
    }

    if (this.element.dataset.favorited === 'true') {
      axios.delete(this.element.dataset.unfavoriteUrl, {
        headers: {
          'ACCEPT': 'application/json'
        }
      }).then((response) => {
        this.element.dataset.favorited = 'false'
        this.element.setAttribute('fill', '#ced4da');
      });
    } else {
      axios.post(this.element.dataset.favoriteUrl, {
        user_id: this.element.dataset.userId,
        property_id: this.element.dataset.propertyId
      }, {
        headers: {
          'ACCEPT': 'application/json'
        }
      })
      .then((response) => {
        this.element.dataset.favorited = 'true'
        this.element.setAttribute('fill', 'red');
      });
    }
  }
}
