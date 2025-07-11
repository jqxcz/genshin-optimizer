import {
  AdBanner,
  AdBlockContextWrapper,
  AdRailSticky,
} from '@genshin-optimizer/common/ad'
import { ScrollTop, useRefSize } from '@genshin-optimizer/common/ui'
import { isDev } from '@genshin-optimizer/common/util'
import { setDebugMode } from '@genshin-optimizer/pando/engine'
import { DatabaseProvider } from '@genshin-optimizer/zzz/db-ui'
import '@genshin-optimizer/zzz/i18n' // import to load translations
import PageHome from '@genshin-optimizer/zzz/page-home'
import { theme } from '@genshin-optimizer/zzz/theme'
import {
  Box,
  Container,
  CssBaseline,
  Skeleton,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material'
import { Suspense, lazy } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../styles.scss'
import { ZOAdWrapper } from '@genshin-optimizer/zzz/ui'
import Footer from './Footer'
import Header from './Header'
const PageDiscs = lazy(() => import('@genshin-optimizer/zzz/page-discs'))
const PageOptimize = lazy(() => import('@genshin-optimizer/zzz/page-optimize'))
const PageCharacters = lazy(
  () => import('@genshin-optimizer/zzz/page-characters')
)
const PageWengines = lazy(() => import('@genshin-optimizer/zzz/page-wengines'))
const PageSettings = lazy(() => import('@genshin-optimizer/zzz/page-settings'))

// Enable debug mode for Pando calcs
setDebugMode(isDev)

export default function App() {
  return (
    <StyledEngineProvider injectFirst>
      {/* https://mui.com/guides/interoperability/#css-injection-order-2 */}
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <DatabaseProvider>
          <HashRouter basename="/">
            <Content />
            <ScrollTop />
          </HashRouter>
        </DatabaseProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

function Content() {
  const { width, ref } = useRefSize(true)
  const adWidth = width - (theme.breakpoints.values.xl + 10) //account for the "full width" of container
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      position="relative"
    >
      <Header anchor="back-to-top-anchor" />
      {/* Top banner ad */}
      <AdBanner width={width} dataAdSlot="4434533013" Ad={ZOAdWrapper} />
      {/* Main content */}
      <Box
        display="flex"
        ref={ref}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* left Rail ad */}
        <AdRailSticky
          adWidth={adWidth}
          dataAdSlot="4545087926"
          Ad={ZOAdWrapper}
        />
        {/* Content */}
        <Container maxWidth="xl" sx={{ px: { xs: 0.5, sm: 1 } }}>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                sx={{ width: '100%', height: '100%' }}
              />
            }
          >
            <Routes>
              <Route index element={<PageHome />} />
              <Route path="/discs" element={<PageDiscs />} />
              <Route path="/optimize" element={<PageOptimize />} />
              <Route path="/characters/*" element={<PageCharacters />} />
              <Route path="/wengines" element={<PageWengines />} />
              <Route path="/settings" element={<PageSettings />} />
            </Routes>
          </Suspense>
        </Container>
        {/* right rail ad */}
        <AdRailSticky
          adWidth={adWidth}
          dataAdSlot="4545087926"
          Ad={ZOAdWrapper}
          isRightRail
        />
      </Box>

      {/* make sure footer is always at bottom */}
      <Box flexGrow={1} />

      {/* Footer Ad */}
      <AdBanner width={width} dataAdSlot="3150205650" Ad={ZOAdWrapper} />
      <Footer />
    </Box>
  )
}
