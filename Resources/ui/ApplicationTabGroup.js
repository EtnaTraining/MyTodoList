function ApplicationTabGroup() {
		
		var NewToDoWindow = require('ui/NewTodoWindow'),
			ListToDoWindow = require('ui/ListToDoWindow');
		
		var tabGroup = Titanium.UI.createTabGroup();
		
		var newTodoWin = new NewToDoWindow();
		var listToDoWin = new ListToDoWindow();
		
		var tab1 = Titanium.UI.createTab({  
			icon:'KS_nav_views.png',
    			title:'New To Do',
    			window:newTodoWin
		});
		
		var tab2 = Titanium.UI.createTab({  
    			icon:'KS_nav_ui.png',
    			title:'List of ToDOs',
    			window:listToDoWin
		});

		tabGroup.addTab(tab1);  
		tabGroup.addTab(tab2);  
		
		Ti.App.addEventListener('switchTab', function(e) {
			tabGroup.setActiveTab(e.tab);
		});
		
		return tabGroup;
}

module.exports = ApplicationTabGroup;