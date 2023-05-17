const ONE_SECOND = 1000;
const ROUND_TIME_IN_MS = 0.7 * ONE_SECOND;
const RACE_TIME_IN_MS = 10 * ONE_SECOND;

const randomDigit = () => Math.floor(Math.random() * 10);

class Player {
	#currentpos;
	#name;
	constructor(name) {
		this.#name = name;
		this.#currentpos = 0;
	}

	run(steps) {
		this.#currentpos += steps;
	}

	get name() {
		return this.#name;
	}

	get currentPos() {
		return this.#currentpos;
	}
}

const findWinner = (players) => {
	const playersPos = players.map((player) => player.currentPos);
	const highestPos = Math.max.apply(null, playersPos);
	const isWinner = (winners, player) => {
		if (player.currentPos === highestPos) {
			return [...winners, player.name];
		}
		return [...winners];
	};

	const winners = players.reduce(isWinner, []);
	return winners.join(", ");
};

const displayWinner = (players) => {
	const winner = findWinner(players);
	console.log(winner, "Wins");
};

const gameStatus = (players) => {
	const sign = "»";
	const toStatus = (player) =>
		`${sign.repeat(player.currentPos)} [${player.name}}>`;
	return players.map(toStatus).join("\n");
};

const conductRace = (...participants) => {
	const players = participants.map((participant) => new Player(participant));

	const conductRound = () => {
		players.forEach((player) => player.run(randomDigit()));
		console.clear();
		console.log(gameStatus(players));
	};

	const endRace = () => {
		clearInterval(roundTimer);
		displayWinner(players);
	};

	const roundTimer = setInterval(conductRound, ROUND_TIME_IN_MS);
	setTimeout(endRace, RACE_TIME_IN_MS);
};

const main = () => {
	const participants = process.argv.slice(2);
	conductRace(...participants);
};

main();