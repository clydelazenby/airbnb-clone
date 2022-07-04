import { Controller } from '@hotwired/stimulus'
import { Datepicker } from 'vanillajs-datepicker';

export default class extends Controller {
  static targets = ['checkin', 'checkout'];

  connect() {
    const checkinPicker = new Datepicker(this.checkinTarget, {
      minDate: '8/25/2022'
    });

    checkinPicker.setOptions({
      minDate: '9/25/2022'
    });

    checkinPicker.setOptions({
      minDate: '10/25/2022'
    });
  }
}
