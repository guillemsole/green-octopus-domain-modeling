import {expect} from 'chai';
import {GameShow} from '../../src/model/GameShow';
import {Player} from '../../src/model/Player';
import {User, UserId} from '../../src/model/User';
import {Broadcast} from '../../src/model/Broadcast';

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

    describe('Join game shows in different status', () => {
        it('should throw error when trying to join an scheduled game show', () => {
            const gameShow = GameShow.schedule(new Date(), 5000);
            expect(() => {
                user.join(gameShow);
            }).to.throw(Error);
        });

        it('should throw error when trying to join a ready game show', () => {
            const gameShow = GameShow.schedule(new Date(), 5000);
            gameShow.assignQuestions([]);
            expect(() => {
                user.join(gameShow);
            }).to.throw(Error);
        });

        it('should join a started GameShow and get a player', () => {
            const gameShow = GameShow.schedule(new Date(), 5000);
            gameShow.assignQuestions([]);
            gameShow.open(new Broadcast('rtmp://greenoctopus.tech/live', 'wss://greenoctopus.tech/ws'));
            const player = user.join(gameShow);
            expect(player).to.be.instanceof(Player);
            expect(player.isPlayingIn(gameShow)).to.be.equal(true);
            expect(player.userId).to.be.equal(user.id);
        });

        // TODO handle rest of game show states that should throw error.
    });
});
