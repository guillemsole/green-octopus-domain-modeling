import {expect} from 'chai';
import {GameShow} from '../../src/model/GameShow';
import {User, UserId} from '../../src/model/User';

describe('User', () => {
    let user: User;

    before(() => {
        user = new User(new UserId('+00', '000000000'));
    });

    it('is identified by the phone number', () => {
        const newUser = new User(new UserId('+34', '600000000'));
        expect(newUser.id.countryCode).to.be.equal('+34');
        expect(newUser.id.phoneNumber).to.be.equal('600000000');
    });

    it('should be equal if they have the same countryCode and phoneNumber', () => {
        const newUser = new User(new UserId('+34', '600000000'));
        const other = new User(new UserId('+34', '600000000'));

        expect(newUser.equal(other)).to.be.equal(true);
    });

    it('should not be equal if they have not the same countryCode and phoneNumber', () => {
        const newUser = new User(new UserId('+34', '600000000'));
        const other = new User(new UserId('+44', '600000000'));

        expect(newUser.equal(other)).to.be.equal(false);
    });

    it('should join a GameShow', () => {
        const gameShow = GameShow.schedule(new Date(), 5000);
        const player = user.join(gameShow);
        expect(player.isPlayingIn(gameShow)).to.be.equal(true);
        expect(player.userId).to.be.equal(user.id);
    });
});
