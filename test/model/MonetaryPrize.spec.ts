import {expect} from 'chai';
import {MonetaryPrize} from '../../src/model/MonetaryPrize';

describe('MonetaryPrize', () => {
    it('should create a new cash prize', () => {
        const cashPrize = new MonetaryPrize(1000, '€');
        expect(cashPrize.amount).to.be.equal(1000);
        expect(cashPrize.currency).to.be.equal('€');
    });

    it('should give away prize divided between 3 users', () => {
        const cashPrize = new MonetaryPrize(1000, '€');
        expect(cashPrize.givePrizeAway(3)).to.be.equal('333.33€');
    });
});
