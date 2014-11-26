function showPopup(id, title, content, contentAction, canClose, closeAction)
{
	$("#popup>div").attr("id", id);

	$("#popup>div>.title").text(title);

	$("#popup>div>.content").html(content);

	if(contentAction)
	{
		contentAction();
	}

	if(canClose == false)
	{
		$("#popup>div>.close").hide();
	} else
	{
		$("#popup>div>.close").show();

		$("#popup>div>.close").click(function(e)
		{
			closePopup(closeAction);
		});
	}

	$("#popup").fadeIn(animTime);

}

function closePopup(closeAction)
{
	$("#popup").fadeOut(animTime, function()
	{
		$("#popup>div>.close").off("click");

		$("#popup>div").attr("id", "");

		$("#popup>div>.content").html("");

		$("#popup>div>.title").text("");
		
		if(closeAction)
		{
			closeAction();
		}
	});
}

function popupNewPlayer()
{
	showPopup(
		"add_player",
		"Ajouter un Joueur",
		"<form><input id='new_player' type='text' placeholder='Pseudo' required/><input class='button' type='submit' value='Ajouter'/></form>",
		function()
		{
			$("#popup form").submit(function(e)
			{
				e.preventDefault();

				var input = $(".popup #new_player").val();

				loader(true);

				$.ajax(
				{
					url: serverUrl + "queries.php",
					type: "POST",
					cache: false,
					data:
					{
						func: "add_user",
						name: input
					}
				}).done(function(data)
				{
					var user = {};
					user.id = data;
					user.name = input;

					var btn = userSwitch(user);

					if($(".slick-slide").last().find("div").size() < 6)
					{
						$(".slick-slide").last().append(btn);
					} else
					{
						$('#users_slide').slickAdd("<div>" + $("<div></div>").append(btn).html() + "</div>");
					}

					addUserClickAction($(".switch[user_id=\"" + data + "\"]"));

					loader(false);

					closePopup();
				});
			})
		});
}