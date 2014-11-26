$(function()
{
	screenPlayersChoice();
});

function setTitle(title)
{
	$("header>span").text(title);
}

function showPrev(text, action)
{
	if(text)
	{
		$("#prev>span").text(text);
	}

	$("#prev").show();

	if(action)
	{
		$("#prev").click(function(e)
		{
			if(action)
			{
				action();
			}
		});	
	}
}

function hidePrev()
{
	$("#prev").hide();
	$("#prev>span").text("");

	$("#prev").off("click");
}

function showNext(text, action)
{
	if(text)
	{
		$("#next>span").text(text);
	}

	$("#next").show();

	if(action)
	{
		$("#next").click(function(e)
		{
			if(action)
			{
				action();
			}
		});	
	}
}

function hideNext()
{
	$("#next").hide();
	$("#next>span").text("");

	$("#next").off("click");
}

function showLoader()
{
	$("#loader").fadeIn(animTime);
}

function hideLoader()
{
	$("#loader").fadeOut(animTime);
}

function initScreen()
{
	hideNext();
	hidePrev();
	setTitle("");
}

function button(text)
{
	return $("<div></div>").append($("<span></span>").text(text)).addClass("button");
}

function switchButton(text)
{
	return $("<div></div>").append($("<span></span>").text(text)).addClass("switch");
}

function userSwitch(user)
{
	return switchButton(user.name).attr("user_id", user.id).addClass("user");
}

function contractButton(name, contract)
{
	return button(name).addClass("contract").attr("contract", contract);
}

function fausseDonneButton()
{
	return button("Fausse Donne").addClass("fd").addClass("red").attr("contract", "FD");
}