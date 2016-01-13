var scripts = [
	'utils/polyfill',
	'utils/baseUtils',
	'utils/arrayUtils',

	'types/states',
	'types/frames',
	'types/events',
	'types/consts',
	'types/notifications',

	'core/Dispatcher',
	'core/Receiver',
	'core/Notification',
	'core/Model',
	'core/View',
	'core/Controller',

	'components/JournalLayout',
	'components/Notifier',
	'components/Dialog',
	'components/Widget',
	'components/Paginator',
	'components/DataGrid',

	'service/Service',

	'modules/base/Settings',
	'modules/base/Module',
	'modules/base/Bus',
	'modules/base/ModuleManager',

	'modules/journal/JournalView',
	'modules/journal/JournalModel',
	'modules/journal/JournalController',

	'modules/duty/DutyView',
	'modules/duty/DutyModel',
	'modules/duty/DutyController',

	'app'
];

for (var index in scripts) {
	var path = scripts[index];
	document.write('<script src="js/' + path + '.js"></'+'script>');
}
