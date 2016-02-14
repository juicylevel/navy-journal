var scripts = [
	'utils/polyfill',
	'utils/baseUtils',
	'utils/arrayUtils',

	'settings/Settings',

	'core/Dispatcher',
	'core/Receiver',
	'core/Notification',
	'core/Model',
	'core/View',
	'core/Controller',

	'types/Notifications',
	'types/EventTypes',
	'types/Consts',

	'components/JournalLayout',
	'components/Notifier',
	'components/Dialog',
	'components/Widget',
	'components/ViewFrame',
	'components/Paginator',
	'components/grid/DataGrid',
	'components/grid/ActionColumnsConfig',
	'components/grid/ActionColumn',
	'components/grid/RemoveColumn',
	'components/grid/EditColumn',
	'components/grid/CustomRow',

	'service/Service',

	'modules/base/Module',
	'modules/base/Bus',
	'modules/base/ModuleManager',
	'modules/base/ModuleView',

	'modules/index/IndexView',
	'modules/index/IndexModel',
	'modules/index/IndexController',
	'modules/index/frames/DutyListFrame',
	'modules/index/frames/ActiveDutyRow',

	'modules/journal/JournalView',
	'modules/journal/JournalModel',
	'modules/journal/JournalController',

	'modules/duty/DutyView',
	'modules/duty/DutyModel',
	'modules/duty/DutyController',

	'modules/dictionary/DictionaryView',
	'modules/dictionary/DictionaryModel',
	'modules/dictionary/DictionaryController',

	'app'
];

for (var index in scripts) {
	var path = scripts[index];
	document.write('<script src="js/' + path + '.js"></'+'script>');
}
