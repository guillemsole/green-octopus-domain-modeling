import {expect} from 'chai';
import {IndividualGame, IndividualGameId} from '../../src/model/IndividualGame';
import {User, UserId} from '../../src/model/User';

describe('IndividualGame', () => {
    let individualGame;

    before(() => {
        const user = new User(new UserId('+34', '600000000'));
        individualGame = new IndividualGame(new IndividualGameId(new UserId('+34', '600000000'), 0));
    });

    it('should save a new answer', () => {

    });
});
