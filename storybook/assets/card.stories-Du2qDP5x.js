import"./iframe-NtDK7dgc.js";import{t as e}from"./react-CuJLe-eP.js";import{t}from"./jsx-runtime-BjpsfUvM.js";import{t as n}from"./utils-B6KiDbIe.js";import{t as r}from"./button-DTv0CXAF.js";e();var i=t();function a({className:e,size:t=`default`,...r}){return(0,i.jsx)(`div`,{"data-slot":`card`,"data-size":t,className:n(`group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl`,e),...r})}function o({className:e,...t}){return(0,i.jsx)(`div`,{"data-slot":`card-header`,className:n(`group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3`,e),...t})}function s({className:e,...t}){return(0,i.jsx)(`div`,{"data-slot":`card-title`,className:n(`font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm`,e),...t})}function c({className:e,...t}){return(0,i.jsx)(`div`,{"data-slot":`card-description`,className:n(`text-sm text-muted-foreground`,e),...t})}function l({className:e,...t}){return(0,i.jsx)(`div`,{"data-slot":`card-action`,className:n(`col-start-2 row-span-2 row-start-1 self-start justify-self-end`,e),...t})}function u({className:e,...t}){return(0,i.jsx)(`div`,{"data-slot":`card-content`,className:n(`px-4 group-data-[size=sm]/card:px-3`,e),...t})}function d({className:e,...t}){return(0,i.jsx)(`div`,{"data-slot":`card-footer`,className:n(`flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3`,e),...t})}a.__docgenInfo={description:``,methods:[],displayName:`Card`,props:{size:{required:!1,tsType:{name:`union`,raw:`"default" | "sm"`,elements:[{name:`literal`,value:`"default"`},{name:`literal`,value:`"sm"`}]},description:``,defaultValue:{value:`"default"`,computed:!1}}}},o.__docgenInfo={description:``,methods:[],displayName:`CardHeader`},d.__docgenInfo={description:``,methods:[],displayName:`CardFooter`},s.__docgenInfo={description:``,methods:[],displayName:`CardTitle`},l.__docgenInfo={description:``,methods:[],displayName:`CardAction`},c.__docgenInfo={description:``,methods:[],displayName:`CardDescription`},u.__docgenInfo={description:``,methods:[],displayName:`CardContent`};var f={title:`UI/Card`,component:a,tags:[`autodocs`]},p={render:e=>(0,i.jsxs)(a,{...e,className:`w-[350px]`,children:[(0,i.jsxs)(o,{children:[(0,i.jsx)(s,{children:`Customer Operations`}),(0,i.jsx)(c,{children:`Configure core portal parameters for accounts.`})]}),(0,i.jsx)(u,{children:(0,i.jsx)(`div`,{className:`text-sm text-slate-600`,children:`This container manages general settings. You can modify billing and account tiers from the operational details view.`})}),(0,i.jsxs)(d,{className:`justify-between`,children:[(0,i.jsx)(r,{variant:`outline`,children:`Discard`}),(0,i.jsx)(r,{children:`Save Settings`})]})]})},m={render:e=>(0,i.jsxs)(a,{...e,size:`sm`,className:`w-[280px]`,children:[(0,i.jsxs)(o,{children:[(0,i.jsx)(s,{children:`KPI Alert`}),(0,i.jsx)(c,{children:`Billing discrepancies detected.`})]}),(0,i.jsx)(u,{children:(0,i.jsx)(`div`,{className:`text-xs text-rose-700 bg-rose-50 border border-rose-100 p-2.5 rounded-lg`,children:`3 accounts are currently flagged for immediate payment reviews.`})})]})};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Customer Operations</CardTitle>
        <CardDescription>Configure core portal parameters for accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-600">
          This container manages general settings. You can modify billing and account tiers from the operational details view.
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Discard</Button>
        <Button>Save Settings</Button>
      </CardFooter>
    </Card>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => <Card {...args} size="sm" className="w-[280px]">
      <CardHeader>
        <CardTitle>KPI Alert</CardTitle>
        <CardDescription>Billing discrepancies detected.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-rose-700 bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
          3 accounts are currently flagged for immediate payment reviews.
        </div>
      </CardContent>
    </Card>
}`,...m.parameters?.docs?.source}}};var h=[`Default`,`SmallSize`];export{p as Default,m as SmallSize,h as __namedExportsOrder,f as default};