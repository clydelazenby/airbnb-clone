import { Controller } from '@hotwired/stimulus'
import { Datepicker } from 'vanillajs-datepicker';
import { isEmpty } from 'lodash-es';

export default class extends Controller {
  static targets = ['checkin', 'checkout', 'numOfNights', 'nightlyTotal', 'serviceFee', 'total'];

  connect() {
    const checkinPicker = new Datepicker(this.checkinTarget, {
      minDate: this.element.dataset.defaultCheckinDate
    });

    const checkoutPicker = new Datepicker(this.checkoutTarget, {
      minDate: this.element.dataset.defaultCheckoutDate
    });

    this.checkinTarget.addEventListener('changeDate', (e) => {
      const date = new Date(e.target.value);
      date.setDate(date.getDate() + 1);
      checkoutPicker.setOptions({
        minDate: date
      });
      this.updateNightlyTotal();
    });

    this.checkoutTarget.addEventListener('changeDate', (e) => {
      const date = new Date(e.target.value);
      date.setDate(date.getDate() - 1);
      checkinPicker.setOptions({
        maxDate: date
      });
      this.updateNightlyTotal();
    });
  }

  calculateNightlyTotal() {
    return this.numberOfNights() * this.element.dataset.nightlyPrice;
  }

  updateNightlyTotal() {
    this.numOfNightsTarget.textContent = this.numberOfNights();
    this.nightlyTotalTarget.textContent = this.calculateNightlyTotal();
    this.updateServiceFee();
  }

  calculateServiceFee() {
    return (this.calculateNightlyTotal() * this.element.dataset.serviceFeePercentage).toFixed(2);
  }

  updateServiceFee() {
    this.serviceFeeTarget.textContent = this.calculateServiceFee();
    this.updateTotal();
  }

  updateTotal() {
    this.totalTarget.textContent = (+this.calculateNightlyTotal() + +this.element.dataset.cleaningFee + +this.calculateServiceFee()).toFixed(2);
  }

  numberOfNights() {
    if (isEmpty(this.checkinTarget.value) || isEmpty(this.checkoutTarget.value)) {
      return 0;
    }

    const checkinDate = new Date(this.checkinTarget.value);
    const checkoutDate = new Date(this.checkoutTarget.value);
    return (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24);
  }
}
