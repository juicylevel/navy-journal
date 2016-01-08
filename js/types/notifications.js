// базовые оповещения
var VIEW_READY = 'viewReady';

// оповещение о завершении загрузки статуса журнала
var LOAD_JOURNAL_STATUS = 'loadJournalStatus';

// оповещения от диалога с предложением начать новое боевое дежурство
var SHOW_JOURNAL = 'showJournal';
var START_DUTY = 'startDuty';
var COMPLETE_RUN_UP = 'completeRunUp';
var COMPLETE_DUTY = 'completeDuty';

// оповещения от модели журнала.
var CHANGE_LAST_DUTY_INFO = 'changeLastDutyInfo';
var CHANGE_ACTIVE_DUTY_INFO = 'changeActiveDutyInfo';

// оповещения от сервиса
var LOAD_CONFIG_COMPLETE = 'loadConfigComplete';
var LOAD_JOURNAL_GRID_DATA = 'loadJournalGridData';
var CREATE_DUTY_COMPLETE = 'createDutyComplete';
var RUN_UP_COMPLETE = 'runUpComplete';

// оповещения для навигации
var CHANGE_SYSTEM_MENU = 'changeSystemMenu';
var CHANGE_MODULE_MENU = 'changeModuleMenu';
var SELECT_SYSTEM_MENU_ITEM = 'selectSystemMenuItem';
var SELECT_MODULE_MENU_ITEM = 'selectModuleMenuItem';

// оповещения для контейнера фреймов
var CHANGE_FRAME = 'changeFrame';

// оповещения от модели фрейма с таблицей журналов
var CHANGE_JOURNAL_GRID_COLUMNS = 'changeJournalGridColumns';
var CHANGE_JOURNAL_GRID_ROWS = 'changeJournalGridRows';
