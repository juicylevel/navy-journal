var scripts = [
	'utils/polyfill',
	'utils/baseUtils',
	'utils/arrayUtils',

	'types/states',
	'types/frames',
	'types/events',
	'types/consts',
	'types/notifications',

	'settings/Settings',

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
	'components/ViewFrame',
	'components/Paginator',
	'components/grid/DataGrid',
	'components/grid/ActionColumnsConfig',
	'components/grid/ActionColumn',
	'components/grid/RemoveColumn',
	'components/grid/EditColumn',

	'service/Service',

	'modules/base/Module',
	'modules/base/Bus',
	'modules/base/ModuleManager',

	'modules/journal/JournalView',
	'modules/journal/JournalModel',
	'modules/journal/JournalController',
	'modules/journal/frames/JournalGridFrame',

	'modules/duty/DutyView',
	'modules/duty/DutyModel',
	'modules/duty/DutyController',

	'app'
];

for (var index in scripts) {
	var path = scripts[index];
	document.write('<script src="js/' + path + '.js"></'+'script>');
}
