import {
  useEffect, useReducer
} from 'react';
import ReportOrderToolbar from 'src/components/report/order/ReportOrderToolbar';
import ReportOrderResult from 'src/components/report/order/ReportOrderResult';
import { ReportOrderContext } from 'src/utils/contexts';
import reportApi from 'src/utils/api/reportApi';
import Page from '../../components/Page';

const initialState = {
  reports: [],
  pageSize: 10,
  currentPage: 0,
  count: 10,
  triggerFetch: Date.now(),
  filters: {
    start_date: '',
    end_date: ''
  },
  group_by: 'day',
  sort: '',
  isLoading: false
};

function reportOrderReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_PAGE_SIZE':
      return {
        ...state,
        pageSize: action.pageSize,
        currentPage: 0
      };
    case 'CHANGE_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.filters,
        currentPage: 0,
        triggerFetch: Date.now()
      };
    case 'CHANGE_SORT':
      return {
        ...state,
        sort: action.sort
      };
    case 'CHANGE_GROUP_BY':
      return {
        ...state,
        group_by: action.groupBy
      };
    case 'SET_REPORTS':
      return {
        ...state,
        reports: action.reports,
        count: action.count
      };
    case 'TRIGGER_FETCH':
      return {
        ...state,
        currentPage: 0,
        triggerFetch: Date.now()
      };
    case 'REFRESH':
      return {
        ...state,
        triggerFetch: Date.now()
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'SET_UNLOADING':
      return {
        ...state,
        isLoading: false
      };
    case 'UPDATE_REPORT':
      return {
        ...state,
        reports: state.reports.map((i) => {
          if (i.id === action.report.id) {
            return { ...i, ...action.report };
          } return i;
        })
      };
    case 'UPDATE_REPORTS': {
      const newReports = state.reports.slice();
      action.reports.forEach((report) => {
        const index = newReports.findIndex((curReport) => curReport.id === report.id);
        if (index !== -1) {
          newReports[index] = { ...newReports[index], ...report };
        }
      });
      return {
        ...state,
        reports: newReports
      };
    }
    default:
      return state;
  }
}

const ReportOrder = () => {
  const [state, dispatch] = useReducer(reportOrderReducer, initialState);

  useEffect(() => {
    const fetchReports = async () => {
      dispatch({ type: 'SET_LOADING' });
      const { filters } = state;
      const response = await reportApi.getOrderReport({
        current_page: state.currentPage + 1,
        page_size: state.pageSize,
        ...filters,
        group_by: state.group_by,
        sort: state.sort
      });
      dispatch({
        type: 'SET_REPORTS',
        reports: response.data.data,
        count: response.data.pagination.count
      });
      dispatch({ type: 'SET_UNLOADING' });
    };
    fetchReports();
  }, [state.pageSize, state.currentPage, state.filters, state.sort, state.group_by, state.triggerFetch]);
  console.log('report order');
  return (
    <Page
      title="Order Reports"
      context={ReportOrderContext}
      contextValue={{ state, dispatch }}
      toolbar={(
        <ReportOrderToolbar />
      )}
      main={(
        <ReportOrderResult />
      )}
    />
  );
};

export default ReportOrder;
