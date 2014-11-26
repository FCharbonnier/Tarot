function showScreen(id, title, screen)
{
	showLoader();

	initScreen();

	setTitle(title);

	$(".wrapper").html("");

	$(".wrapper").attr("id", id);

	screen();
}

function screenPlayersChoice()
{
	showScreen("players_choice", "Choix des joueurs", function()
	{
		showNext("Reporting", function()
		{
			console.log("Go vers le reporting !!!");
		});

		nbPlayers = 0;

		playersList = [];

		$.ajax(
		{
			url: serverUrl + "queries.php",
			type: "POST",
			cache: false,
			data:
			{
				func: "get_user"
			}
		}).done(function(data)
		{
			var users = eval(data);

			var slide = $("<div></div>").attr("id", "users_slide");

			var currentDiv = $("<div></div>");

			for(var user in users)
			{
				if(user % 6 == 0 && user != 0)
				{
					slide.append(currentDiv);

					currentDiv = $("<div></div>");
				}
				
				currentDiv.append(userSwitch(users[user]));
			}

			slide.append(currentDiv);

			$(".wrapper").append(slide);

			$("#users_slide").slick(
			{
				dots: true,
				infinite: false
			});

			addUserClickAction();

			var usersChoiceButtons = $("<div></div>").attr("id", "users_choice_buttons");

			var ajouterButton = button("Ajouter").attr("id", "ajouter");

			var commencerButton = button("Commencer").attr("id", "commencer").addClass("disable");

			usersChoiceButtons.append($("<div></div>").append(ajouterButton));

			usersChoiceButtons.append($("<div></div>").append(commencerButton));

			$(".wrapper").append(usersChoiceButtons);

			$("#ajouter").click(function(e)
			{
				popupNewPlayer();
			});

			hideLoader();
		});
	});
}

function screenContractChoice()
{
	showScreen("contract_choice", "Tarot à " + nbPlayers + " joueurs", function()
	{
		showPrev("Annuler", screenPlayersChoice);

		showNext("Scores", screenScore);

		team = null;

		$.ajax(
		{
			url: serverUrl + "queries.php",
			type: "POST",
			cache: false,
			data:
			{
				func: "find_team",
				players: playersList,
				count: nbPlayers
			}
		}).done(function(data)
		{
			team = data;

			contract = null;

			appellant = null;

			called = null;

			idGame = new Date().getTime();

			score = 0;

			appendices = {};

			$(".wrapper").append(contractButton("Petite", "P"));
			$(".wrapper").append(contractButton("Garde", "G"));
			$(".wrapper").append(fausseDonneButton());
			$(".wrapper").append(contractButton("Garde Sans", "GS"));
			$(".wrapper").append(contractButton("Garde Contre", "GC"));

			$(".fd").click(function(e)
			{
				var self = this;

				popupSelectPlayer("Choisir le joueur", function(id)
				{
					contract = $(self).attr("contract");
					appellant = id;
					score = -10;

					saveGame(screenContract);
				});
			});

			$(".contract").click(function(e)
			{
				var self = this;

				popupSelectPlayer("Choisir l'appelant", function(id)
				{
					contract = $(self).attr("contract");

					appellant = id;

					if(nbPlayers == 5)
					{
						popupSelectPlayer("Choisir l'appelé", function(id)
						{
							called = id;

							screenPoint();
						});
					} else
					{
						screenPoint();
					}
				});
			});

			hideLoader();

		});
	});
}

function screenScore()
{
	showScreen("score", "Scores", function()
	{

	});
}

function addUserClickAction()
{
	$(".user").off("click");

	$(".user").click(function(e)
	{
		if(nbPlayers < 5 || $(this).hasClass("active"))
		{
			if($(this).hasClass("active"))
			{
				delete playersList[parseInt($(this).attr("user_id"))];
			} else
			{
				playersList[parseInt($(this).attr("user_id"))] = $(this).find("span").text();
			}

			$(this).toggleClass("active");

			nbPlayers = $(".user.active").size();

			if(nbPlayers > 2)
			{
				$("#commencer").removeClass("disable");
				$("#commencer").addClass("enable");

				$("#commencer").off("click");
				$("#commencer").on("click", function(e)
				{
					screenContractChoice();
				});
			} else
			{
				$("#commencer").addClass("disable");
				$("#commencer").removeClass("enable");
				$("#commencer").off("click");
			}
		}
	});
}