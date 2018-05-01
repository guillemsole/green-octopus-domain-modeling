import {Answer} from '../../src/model/Answer';
import {IndividualGame, IndividualGameId} from '../../src/model/IndividualGame';
import {Player} from '../../src/model/Player';
import {Question} from '../../src/model/Question';
import {UserId} from '../../src/model/User';

describe('Player', () => {
    let player: Player;

    before(() => {
        const userId = new UserId('+34', '600000000');
        player = new Player(userId,
            new IndividualGame(new IndividualGameId(userId, 2)));
    });

    it('should answer a question', () => {
        player.answer(new Question('Sports'), new Answer('B'));
    });
});
