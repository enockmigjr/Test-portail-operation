import{t as e}from"./jsx-runtime-BjpsfUvM.js";import{t}from"./utils-B6KiDbIe.js";import{t as n}from"./badge-ohsV6cJm.js";var r=e();function i({status:e,className:i}){let a={active:{label:`Active`,class:`bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50`},suspended:{label:`Suspended`,class:`bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50`},pending:{label:`Pending`,class:`bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50`},archived:{label:`Archived`,class:`bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800/80`}}[e]||{label:e,class:``};return(0,r.jsx)(n,{variant:`outline`,className:t(`px-2.5 py-0.5 rounded-full font-medium text-xs border shadow-sm`,a.class,i),children:a.label})}i.__docgenInfo={description:``,methods:[],displayName:`StatusBadge`,props:{status:{required:!0,tsType:{name:`CustomerStatus`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}};var a={title:`Feedback/StatusBadge`,component:i,tags:[`autodocs`],argTypes:{status:{control:`select`,options:[`active`,`suspended`,`pending`,`archived`]}}},o={args:{status:`active`}},s={args:{status:`suspended`}},c={args:{status:`pending`}},l={args:{status:`archived`}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'active'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'suspended'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'pending'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'archived'
  }
}`,...l.parameters?.docs?.source}}};var u=[`Active`,`Suspended`,`Pending`,`Archived`];export{o as Active,l as Archived,c as Pending,s as Suspended,u as __namedExportsOrder,a as default};