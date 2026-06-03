import"./iframe-NtDK7dgc.js";import{t as e}from"./react-CuJLe-eP.js";import{t}from"./jsx-runtime-BjpsfUvM.js";import{t as n}from"./utils-B6KiDbIe.js";e();var r=t();function i({className:e,...t}){return(0,r.jsx)(`div`,{"data-slot":`table-container`,className:`relative w-full overflow-x-auto`,children:(0,r.jsx)(`table`,{"data-slot":`table`,className:n(`w-full caption-bottom text-sm`,e),...t})})}function a({className:e,...t}){return(0,r.jsx)(`thead`,{"data-slot":`table-header`,className:n(`[&_tr]:border-b`,e),...t})}function o({className:e,...t}){return(0,r.jsx)(`tbody`,{"data-slot":`table-body`,className:n(`[&_tr:last-child]:border-0`,e),...t})}function s({className:e,...t}){return(0,r.jsx)(`tfoot`,{"data-slot":`table-footer`,className:n(`border-t bg-muted/50 font-medium [&>tr]:last:border-b-0`,e),...t})}function c({className:e,...t}){return(0,r.jsx)(`tr`,{"data-slot":`table-row`,className:n(`border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted`,e),...t})}function l({className:e,...t}){return(0,r.jsx)(`th`,{"data-slot":`table-head`,className:n(`h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground has-[[role=checkbox]]:pr-0`,e),...t})}function u({className:e,...t}){return(0,r.jsx)(`td`,{"data-slot":`table-cell`,className:n(`p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pr-0`,e),...t})}function d({className:e,...t}){return(0,r.jsx)(`caption`,{"data-slot":`table-caption`,className:n(`mt-4 text-sm text-muted-foreground`,e),...t})}i.__docgenInfo={description:``,methods:[],displayName:`Table`},a.__docgenInfo={description:``,methods:[],displayName:`TableHeader`},o.__docgenInfo={description:``,methods:[],displayName:`TableBody`},s.__docgenInfo={description:``,methods:[],displayName:`TableFooter`},l.__docgenInfo={description:``,methods:[],displayName:`TableHead`},c.__docgenInfo={description:``,methods:[],displayName:`TableRow`},u.__docgenInfo={description:``,methods:[],displayName:`TableCell`},d.__docgenInfo={description:``,methods:[],displayName:`TableCaption`};var f={title:`UI/Table`,component:i,tags:[`autodocs`]},p=[{id:`1`,name:`Alice Smith`,email:`alice@example.com`,status:`Active`,plan:`Enterprise`},{id:`2`,name:`Bob Jones`,email:`bob@example.com`,status:`Suspended`,plan:`Pro`},{id:`3`,name:`Charlie Brown`,email:`charlie@example.com`,status:`Pending`,plan:`Basic`}],m={render:()=>(0,r.jsxs)(i,{children:[(0,r.jsx)(d,{children:`A list of active operational customers.`}),(0,r.jsx)(a,{children:(0,r.jsxs)(c,{children:[(0,r.jsx)(l,{children:`Customer Name`}),(0,r.jsx)(l,{children:`Email`}),(0,r.jsx)(l,{children:`Status`}),(0,r.jsx)(l,{className:`text-right`,children:`Plan`})]})}),(0,r.jsx)(o,{children:p.map(e=>(0,r.jsxs)(c,{children:[(0,r.jsx)(u,{className:`font-medium`,children:e.name}),(0,r.jsx)(u,{children:e.email}),(0,r.jsx)(u,{children:e.status}),(0,r.jsx)(u,{className:`text-right`,children:e.plan})]},e.id))}),(0,r.jsx)(s,{children:(0,r.jsxs)(c,{children:[(0,r.jsx)(u,{colSpan:3,children:`Total Entries`}),(0,r.jsx)(u,{className:`text-right font-bold`,children:`3`})]})})]})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Table>
      <TableCaption>A list of active operational customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Plan</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customersSample.map(c => <TableRow key={c.id}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>{c.email}</TableCell>
            <TableCell>{c.status}</TableCell>
            <TableCell className="text-right">{c.plan}</TableCell>
          </TableRow>)}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Entries</TableCell>
          <TableCell className="text-right font-bold">3</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
}`,...m.parameters?.docs?.source}}};var h=[`Default`];export{m as Default,h as __namedExportsOrder,f as default};