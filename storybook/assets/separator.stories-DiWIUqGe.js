import{s as e}from"./iframe-NtDK7dgc.js";import{t}from"./react-CuJLe-eP.js";import{t as n}from"./jsx-runtime-BjpsfUvM.js";import{t as r}from"./utils-B6KiDbIe.js";import{t as i}from"./dist-D_otfi6P.js";var a=e(t(),1),o=n(),s=`Separator`,c=`horizontal`,l=[`horizontal`,`vertical`],u=a.forwardRef((e,t)=>{let{decorative:n,orientation:r=c,...a}=e,s=d(r)?r:c,l=n?{role:`none`}:{"aria-orientation":s===`vertical`?s:void 0,role:`separator`};return(0,o.jsx)(i.div,{"data-orientation":s,...l,...a,ref:t})});u.displayName=s;function d(e){return l.includes(e)}var f=u;function p({className:e,orientation:t=`horizontal`,decorative:n=!0,...i}){return(0,o.jsx)(f,{"data-slot":`separator`,decorative:n,orientation:t,className:r(`shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch`,e),...i})}p.__docgenInfo={description:``,methods:[],displayName:`Separator`,props:{orientation:{defaultValue:{value:`"horizontal"`,computed:!1},required:!1},decorative:{defaultValue:{value:`true`,computed:!1},required:!1}}};var m={title:`UI/Separator`,component:p,tags:[`autodocs`],argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`]},decorative:{control:`boolean`}}},h={render:e=>(0,o.jsxs)(`div`,{className:`w-[300px] space-y-2`,children:[(0,o.jsx)(`div`,{className:`text-sm font-semibold text-slate-800`,children:`Operational Log`}),(0,o.jsx)(p,{...e}),(0,o.jsx)(`div`,{className:`text-xs text-slate-500`,children:`Last updated: 2 minutes ago.`})]})},g={render:e=>(0,o.jsxs)(`div`,{className:`flex h-5 items-center space-x-4 text-sm font-semibold text-slate-800`,children:[(0,o.jsx)(`div`,{children:`Dashboard`}),(0,o.jsx)(p,{...e,orientation:`vertical`}),(0,o.jsx)(`div`,{children:`Customers`}),(0,o.jsx)(p,{...e,orientation:`vertical`}),(0,o.jsx)(`div`,{children:`Settings`})]})};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <div className="w-[300px] space-y-2">
      <div className="text-sm font-semibold text-slate-800">Operational Log</div>
      <Separator {...args} />
      <div className="text-xs text-slate-500">Last updated: 2 minutes ago.</div>
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: args => <div className="flex h-5 items-center space-x-4 text-sm font-semibold text-slate-800">
      <div>Dashboard</div>
      <Separator {...args} orientation="vertical" />
      <div>Customers</div>
      <Separator {...args} orientation="vertical" />
      <div>Settings</div>
    </div>
}`,...g.parameters?.docs?.source}}};var _=[`Horizontal`,`Vertical`];export{h as Horizontal,g as Vertical,_ as __namedExportsOrder,m as default};