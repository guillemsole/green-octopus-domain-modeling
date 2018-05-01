import {expect} from 'chai';
import {IndividualGame, IndividualGameId} from '../../src/model/IndividualGame';
import {Player} from '../../src/model/Player';
import {UserId} from '../../src/model/User';

describe('Player', () => {

    it('should create a player', () => {
        const userId = new UserId('+34', '600000000');
        const player = new Player(userId, new IndividualGame(new IndividualGameId(userId, 2)));
        expect(player.userId).to.be.equal(userId);
    });

    it('should throw when individual game user id is not the same as user id', () => {
        expect(() => {
            const player = new Player(new UserId('+34', '600000000'),
                new IndividualGame(new IndividualGameId(new UserId('+44', '600000000'), 2)));
        }).to.throw(Error);
    });

    it('should answer a question', () => {
        const userId = new UserId('+34', '600000000');
        const player = new Player(userId,
            new IndividualGame(new IndividualGameId(userId, 2)));
        player.answer(12, 0);
    });
});
